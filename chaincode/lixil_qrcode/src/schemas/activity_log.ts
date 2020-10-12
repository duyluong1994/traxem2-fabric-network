// created by Duy Luong at 2020/05/12 17:01.
// - Blockchain Developer -
// Mail: luong.duc.duy@vsi-international.com
// Telegram: t.me/mr_eos94
import * as yup from "yup";
import { PrefixMaster } from "../PrefixMaster";
export const ActivityLogSchema = yup.object().shape({
    id: yup.string().required(),
    content: yup.string().required(),
    type: yup.string().required(),
    createdTime: yup.date().required(),
    createdId: yup.string().required(),
    productionId: yup
        .array()
        .of(yup.string())
        .test("productionId", "productionId is not valid", async function (
            productionId
        ) {
            if (productionId) {
                const context: any = this.options.context;
                console.log(this.options, context);
                for (let id of productionId) {
                    let dataAsBytes = await context.stub.getState(
                        PrefixMaster.PRODUCTION + id
                    );
                    if (!dataAsBytes || dataAsBytes.length === 0) {
                        return false;
                    }
                }
            }
            return true;
        })
        .notRequired(),
    productionName: yup.string().notRequired(),
});
