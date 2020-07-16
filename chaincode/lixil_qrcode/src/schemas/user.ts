import * as yup from "yup";
import { OrgSchema } from "./org";
import { MediaSchema } from "./media";
export const UserSchema = {
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
    org: yup
        .object()
        .shape({
            id: yup.string().required(),
            name: yup.string().required(),
            address: yup.string().notRequired(),
            businessNumber: yup.string().notRequired(),
            codePrefix: yup.string().notRequired(),
            description: yup.string().notRequired(),
            email: yup.string().email().notRequired(),
            fax: yup.string().notRequired(),
            hotLine: yup.string().notRequired(),
            logoUrl: yup.string().url().notRequired(),
            phone: yup.string().notRequired(),
            representativeName: yup.string().notRequired(),
            representativePosition: yup.string().notRequired(),
            shortName: yup.string().notRequired(),
            taxNumber: yup.string().notRequired(),
            website: yup.string().url().notRequired(),
            bizRoles: yup
                .array()
                .of(
                    yup
                        .string()
                        .matches(/(PRODUCER|VERIFIER|TRANSPORTER|RETAILER)/)
                )
                .min(1)
                .max(4)
                .notRequired(),
            media: yup
                .array()
                .of(yup.object().shape(MediaSchema))
                .max(5)
                .notRequired(),
            establishedDate: yup.date().notRequired(),
        })
        .notRequired(),
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
    media: yup.array().of(yup.object(MediaSchema)).max(5).notRequired(),
};
