// created by Duy Luong at 2020/05/18 11:28.
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
import { UserSchema } from "../schemas/user";
import * as StateDB from "../controllers/StateDB";
import { PrefixMaster } from "../PrefixMaster";

export class User extends Contract {
    prefix: string = PrefixMaster.USER;

    constructor() {
        super("User");
    }

    @Param("payload", "string")
    @Transaction()
    public async set(ctx: Context, payload: string) {
        const newData = JSON.parse(payload);
        await StateDB.setState(ctx, newData, this.prefix, UserSchema);
    }

    @Param("id", "string")
    @Returns("any")
    @Transaction(false)
    public async get(ctx: Context, id: string): Promise<any> {
        return await StateDB.getState(ctx, id, this.prefix);
    }
}
