import * as yup from "yup";
import { PrefixMaster } from "../PrefixMaster";
export const QrcodeSchema = yup.object().shape({
    code: yup.string().required(),
    codeurl: yup.string().url().notRequired(),
    name: yup.string().notRequired(),
    description: yup.string().notRequired(),
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
    factoryId: yup
        .string()
        .test("factoryId", "factoryId is not valid", async function (
            factoryId
        ) {
            if (factoryId) {
                const context: any = this.options.context;
                const dataAsBytes = await context.ctx.stub.getState(
                    PrefixMaster.FACTORY + factoryId
                );
                if (!dataAsBytes || dataAsBytes.length === 0) {
                    return false;
                }
            }
            return true;
        })
        .notRequired(),
    productId: yup
        .string()
        .test("productId", "productId is not valid", async function (
            productId
        ) {
            if (productId) {
                const context: any = this.options.context;
                const dataAsBytes = await context.ctx.stub.getState(
                    PrefixMaster.PRODUCT + productId
                );
                if (!dataAsBytes || dataAsBytes.length === 0) {
                    return false;
                }
            }
            return true;
        })
        .notRequired(),
    historyDataId: yup
        .array()
        .of(yup.string())
        .test("historyDataId", "historyDataId is not valid", async function (
            historyDataId
        ) {
            if (historyDataId) {
                const context: any = this.options.context;
                for (let id of historyDataId) {
                    let dataAsBytes = await context.ctx.stub.getState(
                        PrefixMaster.HISTORY + id
                    );
                    if (!dataAsBytes || dataAsBytes.length === 0) {
                        return false;
                    }
                }
            }
            return true;
        })
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
    guaranteeId: yup
        .string()
        .test("guaranteeId", "guaranteeId is not valid", async function (
            guaranteeId
        ) {
            if (guaranteeId) {
                const context: any = this.options.context;
                const dataAsBytes = await context.ctx.stub.getState(
                    PrefixMaster.GUARANTEE + guaranteeId
                );
                if (!dataAsBytes || dataAsBytes.length === 0) {
                    return false;
                }
            }
            return true;
        })
        .notRequired(),
    maintenanceId: yup
        .string()
        .test("maintenanceId", "maintenanceId is not valid", async function (
            maintenanceId
        ) {
            if (maintenanceId) {
                const context: any = this.options.context;
                const dataAsBytes = await context.ctx.stub.getState(
                    PrefixMaster.MAINTENANCE + maintenanceId
                );
                if (!dataAsBytes || dataAsBytes.length === 0) {
                    return false;
                }
            }
            return true;
        })
        .notRequired(),
    qrcodeRef: yup
        .string()
        .test("qrcodeRef", "qrcodeRef is not valid", async function (
            qrcodeRef
        ) {
            if (qrcodeRef) {
                const context: any = this.options.context;
                const dataAsBytes = await context.ctx.stub.getState(
                    PrefixMaster.QR + qrcodeRef
                );
                if (!dataAsBytes || dataAsBytes.length === 0) {
                    return false;
                }
            }
            return true;
        })
        .notRequired(),
    updatedBy: yup
        .string()
        .test("updatedBy", "updatedBy is not valid", async function (
            updatedBy
        ) {
            if (updatedBy) {
                const context: any = this.options.context;
                const dataAsBytes = await context.ctx.stub.getState(
                    PrefixMaster.USER + updatedBy
                );
                if (!dataAsBytes || dataAsBytes.length === 0) {
                    return false;
                }
            }
            return true;
        })
        .required(),
    createdBy: yup
        .string()
        .test("createdBy", "createdBy is not valid", async function (
            createdBy
        ) {
            if (createdBy) {
                const context: any = this.options.context;
                const dataAsBytes = await context.ctx.stub.getState(
                    PrefixMaster.USER + createdBy
                );
                if (!dataAsBytes || dataAsBytes.length === 0) {
                    return false;
                }
            }
            return true;
        })
        .notRequired(),
});
