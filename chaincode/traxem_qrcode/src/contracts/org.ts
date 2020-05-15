// created by Duy Luong at 2020/05/13 14:01.
// - Blockchain Developer -
// Mail: duyluong1994@gmail.com
// Telegram: t.me/mr_eos94

import { Context, Contract } from "fabric-contract-api";
import { IOrg } from "../models/org";
import { isArray } from "util";

export class Org extends Contract {
    prefix: string = "ORG";

    constructor() {
        super("Org");
    }

    public async setOrgState(ctx: Context, payload: string) {
        const newOrg = JSON.parse(payload);
        if (!isArray(newOrg)) {
            await this.createOrUpdateOrgState(ctx, newOrg);
        } else {
            for (let it of newOrg) {
                await this.createOrUpdateOrgState(ctx, it);
            }
        }
    }

    private async createOrUpdateOrgState(ctx: Context, item: IOrg) {
        let orgAsBytes = await ctx.stub.getState(this.prefix + item.id);
        if (!orgAsBytes || orgAsBytes.length === 0) {
            await ctx.stub.putState(
                this.prefix + item.id,
                Buffer.from(JSON.stringify(item))
            );
            console.info("Added <--> ", item);
        } else {
            let org: IOrg = JSON.parse(orgAsBytes.toString());
            org = item;
            await ctx.stub.putState(
                this.prefix + org.id,
                Buffer.from(JSON.stringify(org))
            );
            console.info("Updated <--> ", item);
        }
    }

    public async getOrgState(ctx: Context, orgId: string): Promise<string> {
        const orgAsBytes = await ctx.stub.getState(this.prefix + orgId);
        if (!orgAsBytes || orgAsBytes.length === 0) {
            throw new Error(`${orgId} does not exist`);
        }
        console.log(orgAsBytes);
        return orgAsBytes.toString();
    }
}
