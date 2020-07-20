// created by Duy Luong at 2020/05/18 13:25.
// - Blockchain Developer -
// Mail: luong.duc.duy@vsi-international.com
// Telegram: t.me/mr_eos94

import {
    Context,
    Contract,
    Transaction,
    Returns,
    Param,
    Object,
} from "fabric-contract-api";
import { QrCodeCartonSchema } from "../schemas/qr_code_carton";
import { QrCodeBodySchema } from "../schemas/qr_code_body";
import { UserSchema } from "../schemas/user";
import { HistoryDataSchema } from "../schemas/history-data";
import * as StateDB from "../services/StateDB";
import { PrefixMaster } from "../PrefixMaster";

export class Qrcode extends Contract {
    QR_PKEY: string = PrefixMaster.QR_PKEY;
    QR_COMPOSITE_PKEY: string = PrefixMaster.QR_COMPOSITE_PKEY;
    constructor() {
        super("Qrcode");
    }

    @Param("qrCodeData", "string")
    @Param("isCarton", "string")
    @Returns("any")
    @Transaction()
    public async create(ctx: Context, qrCodeData: string, isCarton: any) {
        const newData = JSON.parse(qrCodeData);
        isCarton = isCarton === "true";
        let dataValid = await StateDB.validateData(
            ctx,
            newData,
            isCarton ? QrCodeCartonSchema : QrCodeBodySchema
        );
        if (dataValid) {
            return await StateDB.createQrState(
                ctx,
                dataValid,
                this.QR_PKEY,
                isCarton
            );
        } else {
            throw new Error(`Something went wrong.`);
        }
    }

    @Param("qrCodeData", "string")
    @Returns("any")
    @Transaction()
    public async update(ctx: Context, qrCodeData: string) {
        const newData = JSON.parse(qrCodeData);

        let qrState = await StateDB.getState(ctx, newData.qrCode, this.QR_PKEY);
        if (!qrState.isCarton && qrState.isLinked) {
            // isBody and linked => get CartonKey for update
            let qrCompositeItr = ctx.stub.getStateByPartialCompositeKey(
                this.QR_COMPOSITE_PKEY,
                [qrState.qrCode]
            );
            for await (const qr of qrCompositeItr) {
                newData.qrCode = ctx.stub.splitCompositeKey(
                    qr.key
                ).attributes[1];
                break;
            }
        } else if (!qrState.isCarton && !qrState.isLinked) {
            throw new Error(
                `This QR code ${qrState.qrCode} is a body. Can't be update if not linked to any carton.`
            );
        }

        let dataValid = await StateDB.validateData(
            ctx,
            newData,
            QrCodeCartonSchema
        );

        if (dataValid) {
            return await StateDB.updateQrState(ctx, dataValid, this.QR_PKEY);
        } else {
            throw new Error(`Something went wrong.`);
        }
    }

    @Param("body", "string")
    @Param("carton", "string")
    @Param("user", "string")
    @Returns("any")
    @Transaction()
    public async link(
        ctx: Context,
        body: string,
        carton: string,
        user: string
    ) {
        //validate
        let bodyQR = await StateDB.getState(ctx, body, this.QR_PKEY);
        let cartonQR = await StateDB.getState(ctx, carton, this.QR_PKEY);
        let userValid = await StateDB.validateData(
            ctx,
            JSON.parse(user),
            UserSchema
        );

        if (!userValid) {
            throw new Error(`User is invalid.`);
        }

        if (bodyQR.isLinked) {
            throw new Error(`${body} is linked with other carton.`);
        }

        if (cartonQR.isLinked) {
            throw new Error(`${carton} is linked with other body.`);
        }
        if (bodyQR.isCarton) {
            throw new Error(`${body}'s not a body.`);
        }
        if (!cartonQR.isCarton) {
            throw new Error(`${carton}'s not a carton.`);
        }

        //link body to carton with compositekey
        const compositeQRKey = ctx.stub.createCompositeKey(
            this.QR_COMPOSITE_PKEY,
            [body, carton]
        );

        await ctx.stub.putState(compositeQRKey, new Buffer([0x00]));

        // update QRstate body + carton to linked true
        bodyQR.isLinked = true;
        cartonQR.isLinked = true;
        bodyQR.updatedAt = new Date();
        cartonQR.updatedAt = new Date();
        bodyQR.updatedBy = userValid;
        cartonQR.updatedBy = userValid;
        await ctx.stub.putState(
            this.QR_PKEY + bodyQR.qrCode,
            Buffer.from(JSON.stringify(bodyQR))
        );
        await ctx.stub.putState(
            this.QR_PKEY + cartonQR.qrCode,
            Buffer.from(JSON.stringify(cartonQR))
        );

        // return result
        return {
            body,
            carton,
            message: `Linked ${body} to ${carton} successful`,
        };
    }

    @Param("qrCode", "string")
    @Param("action", "string")
    @Param("user", "string")
    @Returns("any")
    @Transaction()
    public async addHistoryData(
        ctx: Context,
        qrCode: string,
        action: string,
        user: string
    ) {
        const newHistoryData = await StateDB.validateData(
            ctx,
            JSON.parse(action),
            HistoryDataSchema
        );
        const newUser = await StateDB.validateData(
            ctx,
            JSON.parse(user),
            UserSchema
        );

        //check data
        let qrState = await StateDB.getState(ctx, qrCode, this.QR_PKEY);
        let bodyQrCode;
        if (!qrState.isCarton && qrState.isLinked) {
            // isBody and linked => get CartonKey for add historyData
            let qrCompositeItr = ctx.stub.getStateByPartialCompositeKey(
                this.QR_COMPOSITE_PKEY,
                [qrState.qrCode]
            );
            for await (const qr of qrCompositeItr) {
                qrCode = ctx.stub.splitCompositeKey(qr.key).attributes[1];
                bodyQrCode = ctx.stub.splitCompositeKey(qr.key).attributes[0];
                break;
            }
        } else if (!qrState.isCarton && !qrState.isLinked) {
            throw new Error(
                `This QR code ${qrState.qrCode} is a body. Can't be update if not linked to any carton.`
            );
        }

        //add HistoryData
        let targetQR = await StateDB.getState(ctx, qrCode, this.QR_PKEY);
        if (!targetQR.historyData) {
            targetQR.historyData = [];
        }
        targetQR.historyData.push(newHistoryData);
        targetQR.updatedAt = new Date();
        targetQR.updatedBy = newUser;
        await ctx.stub.putState(
            this.QR_PKEY + targetQR.qrCode,
            Buffer.from(JSON.stringify(targetQR))
        );

        // Also update body QR code status
        if (bodyQrCode) {
            let bodyQR = await StateDB.getState(ctx, bodyQrCode, this.QR_PKEY);
            bodyQR.updatedAt = new Date();
            bodyQR.updatedBy = newUser;
            await ctx.stub.putState(
                this.QR_PKEY + bodyQR.qrCode,
                Buffer.from(JSON.stringify(bodyQR))
            );
        }

        return {
            qrCode,
            message: `Add history data to ${qrCode} successful`,
        };
    }

    @Param("qrCode", "string")
    @Returns("any")
    @Transaction(false)
    public async get(ctx: Context, qrCode: string): Promise<any> {
        let qrState = await StateDB.getState(ctx, qrCode, this.QR_PKEY);
        if (!qrState.isCarton && qrState.isLinked) {
            // isBody and linked => get CartonKey and assign data to qrcode and return it.
            let qrCompositeItr = ctx.stub.getStateByPartialCompositeKey(
                this.QR_COMPOSITE_PKEY,
                [qrState.qrCode]
            );
            for await (const qr of qrCompositeItr) {
                let cartonCode = ctx.stub.splitCompositeKey(qr.key)
                    .attributes[1];
                let result = await StateDB.getState(
                    ctx,
                    cartonCode,
                    this.QR_PKEY
                );
                return { carton: result, body: qrState };
            }
        }
        return qrState;
    }

    @Param("qrCode", "string")
    @Returns("any")
    @Transaction(false)
    public async getHistory(ctx: Context, qrCode: string): Promise<any> {
        // Validate qrCode
        let qrState = await StateDB.getState(ctx, qrCode, this.QR_PKEY);
        //TODO: paginate for big result
        if (!qrState.isLinked) {
            //not linked yet => return historyData for this qrcode
            if (qrState.isCarton) {
                return {
                    carton: await StateDB.getHistory(ctx, qrCode, this.QR_PKEY),
                };
            } else {
                return {
                    body: await StateDB.getHistory(ctx, qrCode, this.QR_PKEY),
                };
            }
        } else {
            //    linked => find carton and body then return both historyData
            let qrCompositeItr = ctx.stub.getStateByPartialCompositeKey(
                this.QR_COMPOSITE_PKEY,
                [qrCode]
            );

            for await (const qr of qrCompositeItr) {
                let bodyQrCode = ctx.stub.splitCompositeKey(qr.key)
                    .attributes[0];
                let cartonQrCode = ctx.stub.splitCompositeKey(qr.key)
                    .attributes[1];
                let bodyHistory = await StateDB.getHistory(
                    ctx,
                    bodyQrCode,
                    this.QR_PKEY
                );
                let cartonHistory = await StateDB.getHistory(
                    ctx,
                    cartonQrCode,
                    this.QR_PKEY
                );
                return { carton: cartonHistory, body: bodyHistory };
                break;
            }
        }
    }
}
