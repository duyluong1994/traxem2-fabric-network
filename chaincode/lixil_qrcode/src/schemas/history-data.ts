import * as yup from "yup";
import { UserSchema } from "./user";
export const HistoryDataSchema = yup.object().shape({
    id: yup.string().required(),
    content: yup.string().required(),
    actionTaken: yup.string().notRequired(),
    actionInfo: yup.lazy((value) => {
        if (value) {
            return yup.object().shape({
                dataContent: yup.string().required(),
                parseClassName: yup.string().required(),
                dataType: yup
                    .string()
                    .matches(/(STRING|JSON|XML|RETAILBASE64ER)/)
                    .required(),
            });
        }
        return yup.mixed().notRequired();
    }),
    updatedBy: UserSchema.required(),
});
