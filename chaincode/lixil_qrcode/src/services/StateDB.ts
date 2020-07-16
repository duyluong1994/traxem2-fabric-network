import { Context } from "fabric-contract-api";
import { PrefixMaster } from "../PrefixMaster";
import {} from "fabric-shim-api";

export const getAllResults = async (promiseOfIterator: any) => {
    const allResults = [];
    for await (const res of promiseOfIterator) {
        allResults.push(JSON.parse(res.value.toString()));
    }
    return allResults;
};

export const createQrState = async (
    ctx: Context,
    item: any,
    prefix: string,
    isCarton: boolean
) => {
    console.log(prefix, item);
    const dataAsBytes = await ctx.stub.getState(prefix + item.qrCode);
    console.log(dataAsBytes);
    console.log(dataAsBytes.length);
    if (dataAsBytes || dataAsBytes.length !== 0) {
        throw new Error(
            `${item.qrCode} is existed. Please update it instead of create new.`
        );
    }
    item.createdAt = new Date();
    item.updatedAt = new Date();
    item.isCarton = isCarton;
    item.isLinked = false;

    await ctx.stub.putState(
        prefix + item.qrCode,
        Buffer.from(JSON.stringify(item))
    );
    console.info("Added <--> ", item);
    return {
        qrCode: item.qrCode,
        message: "Create QR code successful",
        txId: ctx.stub.getTxID(),
        timestamp: ctx.stub.getTxTimestamp(),
    };
};

export const updateQrState = async (
    ctx: Context,
    item: any,
    prefix: string
) => {
    const dataAsBytes = await ctx.stub.getState(prefix + item.qrCode);
    if (!dataAsBytes || dataAsBytes.length === 0) {
        throw new Error(`${item.qrCode} does not exist.`);
    }
    let it = JSON.parse(dataAsBytes.toString());
    if (!it.isCarton) {
        throw new Error(
            `This QR code ${it.qrCode} is a body. Can't be update if not linked to any carton.`
        );
    }
    Object.assign(it, item);
    it.updatedAt = new Date();
    await ctx.stub.putState(
        prefix + it.qrCode,
        Buffer.from(JSON.stringify(it))
    );
    console.info("Updated <--> ", it);
    return {
        qrCode: it.qrCode,
        message: "Update QR code successful",
        txId: ctx.stub.getTxID(),
        timestamp: ctx.stub.getTxTimestamp(),
    };
};

// Validate with yup schema
export const validateData = async (ctx: Context, data: any, schema: any) => {
    return await schema
        .validate(schema.cast(data), { context: { ctx } })
        .catch((errors: any) => {
            throw new Error(errors);
        });
};

export const getState = async (ctx: Context, id: string, prefix: string) => {
    const dataAsBytes = await ctx.stub.getState(prefix + id);
    if (!dataAsBytes || dataAsBytes.length === 0) {
        throw new Error(`${id} does not exist`);
    }
    return JSON.parse(dataAsBytes.toString());
};

export const queryState = async (ctx: Context, queryString: string) => {
    let itr = ctx.stub.getQueryResult(queryString);
    let result = await getAllResults(itr);
    return result;
};

export const getHistory = async (ctx: Context, key: string) => {
    const promiseOfIterator = ctx.stub.getHistoryForKey(key);

    const results = [];
    for await (const keyMod of promiseOfIterator) {
        const resp: any = {
            timestamp: keyMod.timestamp,
            txId: keyMod.txId,
        };
        if (keyMod.isDelete) {
            resp.data = "KEY DELETED";
        } else {
            resp.data = keyMod.value.toString();
        }
        results.push(resp);
    }
    return results;
};
