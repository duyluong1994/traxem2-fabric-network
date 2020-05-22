// created by Duy Luong at 2020/05/21 10:44.
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

import * as StateDB from "../controllers/StateDB";
import { PrefixMaster } from "../PrefixMaster";

export class Traxem extends Contract {
    prefix: string = PrefixMaster.TRAXEM;

    constructor() {
        super("Traxem");
    }

    @Param("queryString", "string")
    @Returns("array")
    @Transaction(false)
    public async query(ctx: Context, queryString: string): Promise<any[]> {
        return await StateDB.queryState(ctx, queryString);
    }
}
