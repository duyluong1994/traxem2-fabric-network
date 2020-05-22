// created by Duy Luong at 2020/05/12 17:01.
// - Blockchain Developer -
// Mail: duyluong1994@gmail.com
// Telegram: t.me/mr_eos94

import * as yup from "yup";
export const ActionInfoSchema = yup.object().shape({
    id: yup.string().required(),
    dataContent: yup.string().required(),
    parseClassName: yup.string().required(),
    dataType: yup
        .string()
        .matches(/(STRING|JSON|XML|RETAILBASE64ER)/)
        .required(),
});
