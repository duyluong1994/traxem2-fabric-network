// created by Duy Luong at 2020/05/12 17:01.
// - Blockchain Developer -
// Mail: luong.duc.duy@vsi-international.com
// Telegram: t.me/mr_eos94
import * as yup from "yup";
export const HistoryDataSchema = yup.object().shape({
    id: yup.string().required(),
    content: yup.string().required(),
    actionTaken: yup.string().notRequired(),
    actionInfo: yup.lazy((value) => {
        if (value) {
            return yup.object().shape({
                dataContent: yup.string().required(),
                parseClassName: yup.string().required(),
                dataType: yup
                    .string()
                    .matches(/(STRING|JSON|XML|RETAILBASE64ER)/)
                    .required(),
            });
        }
        return yup.mixed().notRequired();
    }),
});
