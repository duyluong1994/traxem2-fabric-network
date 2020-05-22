import * as yup from "yup";
import { PrefixMaster } from "../PrefixMaster";
export const UserSchema = yup.object().shape({
    id: yup.string().required(),
    avatarurl: yup.string().url().notRequired(),
    birthday: yup.date().notRequired(),
    email: yup.string().email().notRequired(),
    email_verified: yup
        .boolean()
        .notRequired()
        .default(() => {
            return false;
        }),
    email_verified_token: yup.string().notRequired(),
    firstName: yup.string().notRequired(),
    lastName: yup.string().notRequired(),
    orgId: yup
        .string()
        .test("orgId", "orgId is not valid", async function (orgId) {
            if (orgId) {
                const context: any = this.options.context;
                const dataAsBytes = await context.ctx.stub.getState(
                    PrefixMaster.ORG + orgId
                );
                if (!dataAsBytes || dataAsBytes.length === 0) {
                    return false;
                }
            }
            return true;
        })
        .notRequired(),
    password: yup.string().notRequired(),
    phone: yup.string().notRequired(),
    position: yup.string().notRequired(),
    username: yup.string().required(),
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
    biz_roles: yup
        .array()
        .of(yup.string().matches(/(PRODUCER|VERIFIER|TRANSPORTER|RETAILER)/))
        .min(1)
        .max(4)
        .notRequired(),
    mediaId: yup
        .array()
        .of(yup.string())
        .test("mediaId", "mediaId is not valid", async function (mediaId) {
            if (mediaId) {
                const context: any = this.options.context;
                for (let id of mediaId) {
                    let dataAsBytes = await context.ctx.stub.getState(
                        PrefixMaster.MEDIA + id
                    );
                    if (!dataAsBytes || dataAsBytes.length === 0) {
                        return false;
                    }
                }
            }
            return true;
        })
        .notRequired(),
});
