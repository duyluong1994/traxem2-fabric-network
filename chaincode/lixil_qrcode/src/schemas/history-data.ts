import * as yup from "yup";
import { PrefixMaster } from "../PrefixMaster";
export const HistoryDataSchema = yup.object().shape({
    id: yup.string().required(),
    content: yup.string().required(),
    actionTaken: yup.string().notRequired(),
    actionInfoId: yup
        .object()
        .shape({
            dataContent: yup.string().required(),
            parseClassName: yup.string().required(),
            dataType: yup
                .string()
                .matches(/(STRING|JSON|XML|RETAILBASE64ER)/)
                .required(),
        })
        .notRequired(),
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
