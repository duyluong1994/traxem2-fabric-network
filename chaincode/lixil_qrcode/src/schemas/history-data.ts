import * as yup from "yup";
import { UserSchema } from "./user";
export const HistoryDataSchema = yup.object().shape({
    id: yup.string().required(),
    content: yup.string().required(),
    actionTaken: yup.string().notRequired(),
    actionInfo: yup
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
    updatedBy: yup.object().shape(UserSchema).required(),
});
