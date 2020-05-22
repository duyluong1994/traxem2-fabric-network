import * as yup from "yup";
import { PrefixMaster } from "../PrefixMaster";
export const ProductSchema = yup.object().shape({
    id: yup.string().required(),
    imageUrl: yup.string().notRequired(),
    description: yup.string().notRequired(),
    name: yup.string().required(),
    country: yup.string().notRequired(),
    area: yup.string().notRequired(),
    quantity: yup.number().notRequired(),
    unit: yup.string().notRequired(),
    producer: yup.string().notRequired(),
    factoryName: yup.string().notRequired(),
    jobName: yup.string().notRequired(),
    ownerId: yup
        .string()
        .test("ownerId", "ownerId is not valid", async function (ownerId) {
            if (ownerId) {
                const context: any = this.options.context;
                const dataAsBytes = await context.ctx.stub.getState(
                    PrefixMaster.USER + ownerId
                );
                if (!dataAsBytes || dataAsBytes.length === 0) {
                    return false;
                }
            }
            return true;
        })
        .notRequired(),
    producedDate: yup.date().required(),
    expiredDate: yup.date().notRequired(),
});
