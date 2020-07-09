// created by Duy Luong at 2020/05/12 17:01.
// - Blockchain Developer -
// Mail: duyluong1994@gmail.com
// Telegram: t.me/mr_eos94

import * as yup from "yup";
import { PrefixMaster } from "../PrefixMaster";
export const ContractSchema = yup.object().shape({
    id: yup.string().required(),
    description: yup.string().notRequired(),
    coverage: yup.string().required(),
    limit: yup.string().required(),
    effectiveDate: yup.date().required(),
    expiredDate: yup.date().notRequired(),
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
    contact: yup.string().notRequired(),
    phoneServices: yup.string().notRequired(),
    address: yup.string().notRequired(),
    updatedBy: yup
        .string()
        .test("updatedBy", "updatedBy is not valid", async function (
            updatedBy
        ) {
            if (updatedBy) {
                const context: any = this.options.context;
                const dataAsBytes = await context.ctx.stub.getState(
                    PrefixMaster.USER + updatedBy
                );
                if (!dataAsBytes || dataAsBytes.length === 0) {
                    return false;
                }
            }
            return true;
        })
        .required(),
    createdBy: yup
        .string()
        .test("createdBy", "createdBy is not valid", async function (
            createdBy
        ) {
            if (createdBy) {
                const context: any = this.options.context;
                const dataAsBytes = await context.ctx.stub.getState(
                    PrefixMaster.USER + createdBy
                );
                if (!dataAsBytes || dataAsBytes.length === 0) {
                    return false;
                }
            }
            return true;
        })
        .notRequired(),
});
