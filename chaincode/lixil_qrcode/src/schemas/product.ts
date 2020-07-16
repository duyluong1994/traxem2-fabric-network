import * as yup from "yup";
import { UserSchema } from "./user";
export const ProductSchema = {
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
    owner: yup.object().shape(UserSchema).notRequired(),
    producedDate: yup.date().required(),
    expiredDate: yup.date().notRequired(),
};
