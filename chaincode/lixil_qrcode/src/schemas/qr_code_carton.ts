import * as yup from "yup";
import { OrgSchema } from "./organization";
import { FactorySchema } from "./factory";
import { ProductSchema } from "./production";
import { WarrantySchema } from "./warranty";
import { UserSchema } from "./user";
import { MediaSchema } from "./media";
import { ContractSchema } from "./contract";
export const QrCodeCartonSchema = yup.object().shape({
    qrCode: yup.string().required(),
    salCode: yup.string().notRequired(),
    sapCode: yup.string().notRequired(),
    barCode: yup.string().notRequired(),
    url: yup.string().url().notRequired(),
    name: yup.string().notRequired(),
    description: yup.string().notRequired(),
    organization: yup.lazy((value) => {
        if (value) {
            return OrgSchema;
        }
        return yup.mixed().notRequired();
    }),
    factory: yup.lazy((value) => {
        if (value) {
            return FactorySchema;
        }
        return yup.mixed().notRequired();
    }),
    product: yup.lazy((value) => {
        if (value) {
            return ProductSchema;
        }
        return yup.mixed().notRequired();
    }),
    media: yup.array().of(MediaSchema).max(5).notRequired(),
    warranty: yup.lazy((value) => {
        if (value) {
            return WarrantySchema;
        }
        return yup.mixed().notRequired();
    }),
    maintenance: yup.lazy((value) => {
        if (value) {
            return ContractSchema;
        }
        return yup.mixed().notRequired();
    }),
    updatedBy: UserSchema.required(),
});
