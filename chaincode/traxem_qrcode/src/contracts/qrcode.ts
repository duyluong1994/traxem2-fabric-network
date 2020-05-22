// created by Duy Luong at 2020/05/18 13:25.
// - Blockchain Developer -
// Mail: duyluong1994@gmail.com
// Telegram: t.me/mr_eos94

import {
    Context,
    Contract,
    Transaction,
    Returns,
    Param,
} from "fabric-contract-api";
import { QrcodeSchema } from "../schemas/qrcode";
import { ProductSchema } from "../schemas/product";
import { FactorySchema } from "../schemas/factory";
import { ContractSchema } from "../schemas/contract";
import { HistoryDataSchema } from "../schemas/history-data";
import * as StateDB from "../controllers/StateDB";
import { PrefixMaster } from "../PrefixMaster";

export class Qrcode extends Contract {
    prefix: string = PrefixMaster.QR;
    constructor() {
        super("Qrcode");
    }
    @Param("payload", "string")
    @Transaction()
    public async set(ctx: Context, payload: string) {
        const newData = JSON.parse(payload);
        await StateDB.setState(ctx, newData, this.prefix, QrcodeSchema);
    }

    @Param("code", "string")
    @Param("orgId", "string")
    @Param("userId", "string")
    @Transaction()
    public async setOrg(
        ctx: Context,
        code: string,
        orgId: string,
        userId: string
    ) {
        const newData = { code, orgId, updatedBy: userId };
        await StateDB.setState(
            ctx,
            newData,
            this.prefix,
            QrcodeSchema,
            false,
            true
        );
    }

    @Param("code", "string")
    @Param("product", "string")
    @Param("userId", "string")
    @Transaction()
    public async setProduct(
        ctx: Context,
        code: string,
        product: string,
        userId: string
    ) {
        const newProduct = JSON.parse(product);
        const newData = { code, productId: newProduct.id, updatedBy: userId };

        //Create or Update product
        await StateDB.setState(
            ctx,
            newProduct,
            PrefixMaster.PRODUCT,
            ProductSchema
        );

        //update qrcode
        await StateDB.setState(
            ctx,
            newData,
            this.prefix,
            QrcodeSchema,
            false,
            true
        );
    }

    @Param("code", "string")
    @Param("factory", "string")
    @Param("userId", "string")
    @Transaction()
    public async setFactory(
        ctx: Context,
        code: string,
        factory: string,
        userId: string
    ) {
        const newFactory = JSON.parse(factory);
        const newData = { code, factoryId: newFactory.id, updatedBy: userId };

        //Create or Update factory
        await StateDB.setState(
            ctx,
            newFactory,
            PrefixMaster.FACTORY,
            FactorySchema
        );

        //update qrcode
        await StateDB.setState(
            ctx,
            newData,
            this.prefix,
            QrcodeSchema,
            false,
            true
        );
    }

    @Param("code", "string")
    @Param("guarantee", "string")
    @Param("userId", "string")
    @Transaction()
    public async setGuarantee(
        ctx: Context,
        code: string,
        guarantee: string,
        userId: string
    ) {
        const newGuarantee = JSON.parse(guarantee);
        const newData = {
            code,
            guaranteeId: newGuarantee.id,
            updatedBy: userId,
        };

        //Create or Update guarantee
        await StateDB.setState(
            ctx,
            newGuarantee,
            PrefixMaster.GUARANTEE,
            ContractSchema
        );

        //update qrcode
        await StateDB.setState(
            ctx,
            newData,
            this.prefix,
            QrcodeSchema,
            false,
            true
        );
    }

    @Param("code", "string")
    @Param("maintenance", "string")
    @Param("userId", "string")
    @Transaction()
    public async setMaintenance(
        ctx: Context,
        code: string,
        maintenance: string,
        userId: string
    ) {
        const Maintenance = JSON.parse(maintenance);
        const newData = {
            code,
            maintenanceId: Maintenance.id,
            updatedBy: userId,
        };

        //Create or Update guarantee
        await StateDB.setState(
            ctx,
            Maintenance,
            PrefixMaster.MAINTENANCE,
            ContractSchema
        );

        //update qrcode
        await StateDB.setState(
            ctx,
            newData,
            this.prefix,
            QrcodeSchema,
            false,
            true
        );
    }

    @Param("code", "string")
    @Param("payload", "string")
    @Param("userId", "string")
    @Transaction()
    public async addHistoryData(
        ctx: Context,
        code: string,
        payload: string,
        userId: string
    ) {
        const newHistoryData = JSON.parse(payload);
        // const newData = {
        //     code,
        //     factoryId: newHistoryData.id,
        //     updatedBy: userId,
        // };

        // //Create history data
        // await StateDB.setState(
        //     ctx,
        //     newHistoryData,
        //     PrefixMaster.HISTORY,
        //     HistoryDataSchema
        // );

        // //update qrcode
        // await StateDB.setState(
        //     ctx,
        //     newData,
        //     this.prefix,
        //     QrcodeSchema,
        //     false,
        //     true
        // );
    }

    @Param("code", "string")
    @Returns("any")
    @Transaction(false)
    public async get(ctx: Context, code: string): Promise<any> {
        return await StateDB.getState(ctx, code, this.prefix);
    }
}
