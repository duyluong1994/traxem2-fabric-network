// created by Duy Luong at 2020/05/13 14:01.
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
import { OrgSchema } from "../schemas/org";
import * as StateDB from "../controllers/StateDB";
import { PrefixMaster } from "../PrefixMaster";

export class Org extends Contract {
    prefix: string = PrefixMaster.ORG;

    constructor() {
        super("Org");
    }

    @Param("payload", "string")
    @Transaction()
    public async set(ctx: Context, payload: string) {
        const newData = JSON.parse(payload);
        await StateDB.setState(ctx, newData, this.prefix, OrgSchema);
    }

    @Param("id", "string")
    @Returns("any")
    @Transaction(false)
    public async get(ctx: Context, id: string): Promise<any> {
        return await StateDB.getState(ctx, id, this.prefix);
    }

    @Returns("array")
    @Transaction(false)
    public async getAll(ctx: Context): Promise<any[]> {
        const queryString = {
            selector: { _id: { $regex: `^${this.prefix}` } },
        };
        return await StateDB.queryState(ctx, JSON.stringify(queryString));
    }
}
