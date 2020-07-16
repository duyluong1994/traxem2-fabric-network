import * as yup from "yup";
import { OrgSchema } from "./org";
import { FactorySchema } from "./factory";
import { ProductSchema } from "./product";
import { UserSchema } from "./user";
import { MediaSchema } from "./media";
import { ContractSchema } from "./contract";
export const QrCodeCartonSchema = yup.object().shape({
    qrCode: yup.string().required(),
    saleCode: yup.string().notRequired(),
    sapCode: yup.string().notRequired(),
    barCode: yup.string().notRequired(),
    url: yup.string().url().notRequired(),
    name: yup.string().notRequired(),
    description: yup.string().notRequired(),
    org: OrgSchema.notRequired(),
    factory: FactorySchema.notRequired(),
    product: ProductSchema.notRequired(),
    media: yup.array().of(MediaSchema).max(5).notRequired(),
    guarantee: ContractSchema.notRequired(),
    maintenance: ContractSchema.notRequired(),
    updatedBy: UserSchema.required(),
});
