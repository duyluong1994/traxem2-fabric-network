// created by Duy Luong at 2020/05/12 17:01.
// - Blockchain Developer -
// Mail: luong.duc.duy@vsi-international.com
// Telegram: t.me/mr_eos94
import * as yup from "yup";
export const ActivityLogSchema = yup.object().shape({
    id: yup.string().required(),
    content: yup.string().required(),
    createdTime: yup.date().required(),
    createdId: yup.string().required(),
    productionId: yup.string().required(),
    productionName: yup.string().required(),
});
