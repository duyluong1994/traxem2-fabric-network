// created by Duy Luong at 2020/05/21 11:10.
// - Blockchain Developer -
// Mail: duyluong1994@gmail.com
// Telegram: t.me/mr_eos94

import * as yup from "yup";
import { PrefixMaster } from "../PrefixMaster";

export const OrgSchema = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    address: yup.string().notRequired(),
    business_number: yup.string().notRequired(),
    code_prefix: yup.string().notRequired(),
    description: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    fax: yup.string().notRequired(),
    hotline: yup.string().notRequired(),
    logourl: yup.string().url().notRequired(),
    orgId: yup
        .string()
        .test("orgId", "orgId is not valid", async function (orgId) {
            if (orgId) {
                const context: any = this.options.context;
                const dataAsBytes = await context.ctx.stub.getState(
                    PrefixMaster.ORG + orgId
                );
                if (!dataAsBytes || dataAsBytes.length === 0) {
                    return false;
                }
            }
            return true;
        })
        .notRequired(),

    phone: yup.string().notRequired(),
    representative_name: yup.string().notRequired(),
    representative_position: yup.string().notRequired(),
    short_name: yup.string().notRequired(),
    tax_number: yup.string().notRequired(),
    website: yup.string().url().notRequired(),
    biz_roles: yup
        .array()
        .of(yup.string().matches(/(PRODUCER|VERIFIER|TRANSPORTER|RETAILER)/))
        .min(1)
        .max(4)
        .notRequired(),
    mediaId: yup
        .array()
        .of(yup.string())
        .test("mediaId", "mediaId is not valid", async function (mediaId) {
            if (mediaId) {
                const context: any = this.options.context;
                for (let id of mediaId) {
                    let dataAsBytes = await context.ctx.stub.getState(
                        PrefixMaster.MEDIA + id
                    );
                    if (!dataAsBytes || dataAsBytes.length === 0) {
                        return false;
                    }
                }
            }
            return true;
        })
        .notRequired(),
    establishedDate: yup.date().notRequired(),
});
