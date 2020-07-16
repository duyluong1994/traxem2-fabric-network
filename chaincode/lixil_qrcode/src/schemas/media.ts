import * as yup from "yup";
export const MediaSchema = {
    id: yup.string().required(),
    name: yup.string().required(),
    caption: yup.string().notRequired(),
    hash: yup.string().required(),
    size: yup.number().min(0).required(),
    storage_id: yup.string().notRequired(),
    type: yup.string().required(),
    description: yup.string().notRequired(),
    url: yup.string().url().required(),
};
