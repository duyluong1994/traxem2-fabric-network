import * as yup from "yup";
export const MediaSchema = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    caption: yup.string().notRequired(),
    contactId: yup.string().notRequired(),
    hash: yup.string().required(),
    size: yup.number().min(0).required(),
    storageId: yup.string().notRequired(),
    type: yup.string().required(),
    url: yup.string().url().required(),
});
