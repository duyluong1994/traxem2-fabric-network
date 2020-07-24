// created by Duy Luong at 2020/05/12 17:01.
// - Blockchain Developer -
// Mail: luong.duc.duy@vsi-international.com
// Telegram: t.me/mr_eos94
import * as yup from "yup";
export const FactorySchema = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    phone: yup.string().notRequired(),
    address: yup.string().notRequired(),
    description: yup.string().notRequired(),
    latitude: yup.string().notRequired(),
    longitude: yup.string().notRequired(),
});
