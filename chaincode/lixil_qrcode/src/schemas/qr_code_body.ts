import * as yup from "yup";
import { UserSchema } from "./user";
export const QrCodeBodySchema = yup.object().shape({
    qrCode: yup.string().required(),
    updatedBy: yup.object().shape(UserSchema).required(),
});
