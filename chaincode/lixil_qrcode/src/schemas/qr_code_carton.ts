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
    org: yup.object().shape(OrgSchema).notRequired(),
    factory: yup.object().shape(FactorySchema).notRequired(),
    product: yup.object().shape(ProductSchema).notRequired(),
    media: yup.array().of(yup.object().shape(MediaSchema)).max(5).notRequired(),
    guarantee: yup.object().shape(ContractSchema).notRequired(),
    maintenance: yup.object().shape(ContractSchema).notRequired(),
    updatedBy: yup.object().shape(UserSchema).required(),
});
