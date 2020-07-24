import * as yup from "yup";
import { OrgSchema } from "./organization";
import { MediaSchema } from "./media";
export const UserSchema = yup.object().shape({
    id: yup.string().required(),
    username: yup.string().required(),
    avatarUrl: yup.string().url().notRequired(),
    birthday: yup.date().notRequired(),
    email: yup.string().email().notRequired(),
    emailVerified: yup
        .boolean()
        .notRequired()
        .default(() => {
            return false;
        }),
    firstName: yup.string().notRequired(),
    lastName: yup.string().notRequired(),
    org: yup.lazy((value) => {
        if (value) {
            return OrgSchema;
        }
        return yup.mixed().notRequired();
    }),
    phone: yup.string().notRequired(),
    position: yup.string().notRequired(),
    registerClass: yup.string().notRequired(),
    userClass: yup.string().notRequired(),
    status: yup.string().notRequired(),
    role: yup
        .array()
        .of(
            yup
                .string()
                .matches(
                    /(ADMIN|SUPER|STAFF|STORE_MANAGER|STORE|SALE_MANAGER|SALE|DISTRIBUTER|AGENCY|SHOP)/
                )
        )
        .notRequired(),
    media: yup.array().of(MediaSchema).max(5).notRequired(),
});
