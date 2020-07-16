import * as yup from "yup";
import {OrgSchema} from "./org";
import {MediaSchema} from "./media";
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
    org: OrgSchema.notRequired(),
    password: yup.string().notRequired(),
    phone: yup.string().notRequired(),
    position: yup.string().notRequired(),
    status: yup
        .string()
        .matches(/(INACTIVE|ACTIVE)/)
        .notRequired()
        .default(() => {
            return "INACTIVE";
        }),
    role: yup
        .array()
        .of(yup.string().matches(/(ADMIN|SUP|MOD|MEM)/))
        .min(1)
        .max(4)
        .notRequired(),
    bizRoles: yup
        .array()
        .of(yup.string().matches(/(PRODUCER|VERIFIER|TRANSPORTER|RETAILER)/))
        .min(1)
        .max(4)
        .notRequired(),
    media: yup
        .array()
        .of(MediaSchema)
        .max(5)
        .notRequired(),
});
