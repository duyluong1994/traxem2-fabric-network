// created by Duy Luong at 2020/05/12 17:01.
// - Blockchain Developer -
// Mail: luong.duc.duy@vsi-international.com
// Telegram: t.me/mr_eos94

import * as yup from "yup";
export const WarrantySchema = yup.object().shape({
    id: yup.string().required(),
    activatedType: yup.string().notRequired(),
    buyerAddress: yup.string().required(),
    buyerEmail: yup.string().email().required(),
    buyerName: yup.string().required(),
    buyerPhone: yup.string().required(),
    buyerProvince: yup.string().required(),
    createdTime: yup.date().required(),
    updatedTime: yup.date().notRequired(),
    creatorId: yup.string().notRequired(),
    notes: yup.string().notRequired(),
    soldType: yup.string().notRequired(),
    warranty_item: yup.lazy((value) => {
        if (value) {
            return yup.object().shape({
                activatedCount: yup.number().required(),
                startTime: yup.date().required(),
                endTime: yup.date().required(),
                extentionDays: yup.number().required(),
                notes: yup.string().notRequired(),
                productionId: yup.string().required(),
                productionName: yup.string().required(),
            });
        }
        return yup.mixed().notRequired();
    }),
});
