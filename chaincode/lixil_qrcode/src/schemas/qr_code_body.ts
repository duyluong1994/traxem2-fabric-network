import * as yup from "yup";
import { PrefixMaster } from "../PrefixMaster";
export const QrCodeBodySchema = yup.object().shape({
    qrCode: yup.string().required(),
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
