// created by Duy Luong at 2020/05/21 11:10.
// - Blockchain Developer -
// Mail: luong.duc.duy@vsi-international.com
// Telegram: t.me/mr_eos94

import * as yup from "yup";
import { MediaSchema } from "./media";
export const OrgSchema = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    address: yup.string().notRequired(),
    businessNumber: yup.string().notRequired(),
    codePrefix: yup.string().notRequired(),
    description: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    fax: yup.string().notRequired(),
    hostline: yup.string().notRequired(),
    logoUrl: yup.string().url().notRequired(),
    phone: yup.string().notRequired(),
    province: yup.string().notRequired(),
    ranking: yup.number().notRequired(),
    representativeName: yup.string().notRequired(),
    representativePosition: yup.string().notRequired(),
    shortName: yup.string().notRequired(),
    status: yup.string().notRequired(),
    taxNumber: yup.string().notRequired(),
    website: yup.string().url().notRequired(),
    bizRole: yup.string().notRequired(),
    bizNumber: yup.string().notRequired(),
    media: yup.array().of(MediaSchema).max(5).notRequired(),
    verifiedDate: yup.date().notRequired(),
    verifiedId: yup.string().notRequired(),
});
