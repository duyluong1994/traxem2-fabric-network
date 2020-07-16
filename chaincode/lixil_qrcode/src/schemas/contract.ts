// created by Duy Luong at 2020/05/12 17:01.
// - Blockchain Developer -
// Mail: luong.duc.duy@vsi-international.com
// Telegram: t.me/mr_eos94

import * as yup from "yup";
import { MediaSchema } from "./media";
import { UserSchema } from "./user";
export const ContractSchema = {
    id: yup.string().required(),
    description: yup.string().notRequired(),
    coverage: yup.string().required(),
    limit: yup.string().required(),
    effectiveDate: yup.date().required(),
    expiredDate: yup.date().notRequired(),
    media: yup.array().of(yup.object().shape(MediaSchema)).max(5).notRequired(),
    contact: yup.string().notRequired(),
    phoneService: yup.string().notRequired(),
    address: yup.string().notRequired(),
    updatedBy: yup.object().shape(UserSchema).required(),
};
