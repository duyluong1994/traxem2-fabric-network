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
} from "fabric-contract-api";
import { ActivityLogSchema } from "../schemas/activity_log";
import { ProductionSchema } from "../schemas/production";
import * as StateDB from "../services/StateDB";
import { PrefixMaster } from "../PrefixMaster";

export class Qrcode extends Contract {
    PRODUCTION_PKEY: string = PrefixMaster.PRODUCTION;
    ACTIVITY_LOG_PKEY: string = PrefixMaster.ACTIVITY_LOG;
    COMPOSITE_PL_PKEY: string = PrefixMaster.COMPOSITE_PL;
    COMPOSITE_LP_PKEY: string = PrefixMaster.COMPOSITE_LP;

    constructor() {
        super("Qrcode");
    }

    @Param("production", "string")
    @Returns("any")
    @Transaction()
    public async createProd(ctx: Context, production: string) {
        try {
            const newData = JSON.parse(production);
            let dataValid = await StateDB.validateData(
                ctx,
                newData,
                ProductionSchema
            );

            return await StateDB.createState(
                ctx,
                dataValid,
                this.PRODUCTION_PKEY
            );
        } catch (e) {
            console.log(e);
            return {
                status: "failed",
                message: e,
            };
        }
    }

    @Param("production", "string")
    @Returns("any")
    @Transaction()
    public async updateProd(ctx: Context, production: string) {
        try {
            const newData = JSON.parse(production);

            let dataValid = await StateDB.validateData(
                ctx,
                newData,
                ProductionSchema
            );

            return await StateDB.updateState(
                ctx,
                dataValid,
                this.PRODUCTION_PKEY
            );
        } catch (e) {
            return {
                status: "failed",
                message: e,
            };
        }
    }

    @Param("productionID", "string")
    @Returns("any")
    @Transaction()
    public async deleteProd(ctx: Context, productionID: string) {
        try {
            return await StateDB.deleteState(
                ctx,
                productionID,
                this.PRODUCTION_PKEY
            );
        } catch (e) {
            return {
                status: "failed",
                message: e,
            };
        }
    }

    @Param("productionID", "string")
    @Returns("any")
    @Transaction(false)
    public async getProd(ctx: Context, productionID: string): Promise<any> {
        try {
            let production = await StateDB.getState(
                ctx,
                productionID,
                this.PRODUCTION_PKEY
            );
            return { status: "success", id: productionID, production };
        } catch (e) {
            return {
                status: "failed",
                message: e,
            };
        }
    }

    @Param("activityLog", "string")
    @Returns("any")
    @Transaction()
    public async createLog(ctx: Context, activityLog: string) {
        try {
            const newData = JSON.parse(activityLog);
            let dataValid = await StateDB.validateData(
                ctx,
                newData,
                ActivityLogSchema
            );

            // map it with production
            await ctx.stub.createCompositeKey(this.COMPOSITE_PL_PKEY, [
                newData.productionId,
                newData.id,
            ]);

            return await StateDB.createState(
                ctx,
                dataValid,
                this.ACTIVITY_LOG_PKEY
            );
        } catch (e) {
            return {
                status: "failed",
                message: e,
            };
        }
    }

    @Param("activityLogID", "string")
    @Returns("any")
    @Transaction(false)
    public async getLog(ctx: Context, activityLogID: string): Promise<any> {
        try {
            const log = await StateDB.getState(
                ctx,
                activityLogID,
                this.ACTIVITY_LOG_PKEY
            );
            return { status: "success", id: activityLogID, log };
        } catch (e) {
            return {
                status: "failed",
                message: e,
            };
        }
    }

    @Param("productionID", "string")
    @Returns("any")
    @Transaction(false)
    public async getLogsByProd(
        ctx: Context,
        productionID: string
    ): Promise<any> {
        try {
            await StateDB.getState(ctx, productionID, this.PRODUCTION_PKEY);

            let prodLogCompositeItr = ctx.stub.getStateByPartialCompositeKey(
                this.COMPOSITE_PL_PKEY,
                [productionID]
            );

            let logs: any = [];
            for await (const log of prodLogCompositeItr) {
                let logId = ctx.stub.splitCompositeKey(log.key).attributes[1];
                let result = await StateDB.getState(
                    ctx,
                    logId,
                    this.PRODUCTION_PKEY
                );
                logs.push(result);
            }

            return {
                status: "success",
                id: productionID,
                data: { logs },
            };
        } catch (e) {
            return {
                status: "failed",
                message: e,
            };
        }
    }

    @Param("productionID", "string")
    @Returns("any")
    @Transaction(false)
    public async getProdHistory(
        ctx: Context,
        productionID: string
    ): Promise<any> {
        try {
            // Validate qrCode
            await StateDB.getState(ctx, productionID, this.PRODUCTION_PKEY);

            const histories = await StateDB.getHistory(
                ctx,
                productionID,
                this.PRODUCTION_PKEY
            );

            //TODO: paginate for big result
            return {
                status: "success",
                id: productionID,
                data: { histories },
            };
        } catch (e) {
            return {
                status: "failed",
                message: e,
            };
        }
    }
}
