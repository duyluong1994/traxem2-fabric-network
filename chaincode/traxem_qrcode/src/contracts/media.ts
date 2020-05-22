// created by Duy Luong at 2020/05/18 13:23.
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
import { MediaSchema } from "../schemas/media";
import * as StateDB from "../controllers/StateDB";
import { PrefixMaster } from "../PrefixMaster";

export class Media extends Contract {
    prefix: string = PrefixMaster.MEDIA;

    constructor() {
        super("Media");
    }

    @Param("payload", "string")
    @Transaction()
    public async set(ctx: Context, payload: string) {
        const newData = JSON.parse(payload);
        await StateDB.setState(ctx, newData, this.prefix, MediaSchema);
    }

    @Param("id", "string")
    @Returns("any")
    @Transaction(false)
    public async get(ctx: Context, id: string): Promise<any> {
        return await StateDB.getState(ctx, id, this.prefix);
    }
}
