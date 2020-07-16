import * as yup from "yup";
export const FactorySchema = {
    id: yup.string().required(),
    name: yup.string().required(),
    phone: yup.string().notRequired(),
    address: yup.string().notRequired(),
    description: yup.string().notRequired(),
    latitude: yup.string().notRequired(),
    longitude: yup.string().notRequired(),
};
