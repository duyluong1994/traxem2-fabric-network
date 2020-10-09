import { Context } from "fabric-contract-api";

export const getAllResults = async (promiseOfIterator: any) => {
    const allResults = [];
    for await (const res of promiseOfIterator) {
        allResults.push(JSON.parse(res.value.toString()));
    }
    return allResults;
};

export const createState = async (ctx: Context, item: any, prefix: string) => {
    const dataAsBytes = await ctx.stub.getState(prefix + item.id);
    if (dataAsBytes.length !== 0) {
        throw new Error(
            `${item.id} is existed. Please update it instead of create new.`
        );
    }

    await ctx.stub.putState(
        prefix + item.id,
        Buffer.from(JSON.stringify(item))
    );
    console.info("Added <--> ", item);

    return {
        status: "success",
        status_code: 200,
        data: item,
        message: "Create successful",
        txId: ctx.stub.getTxID(),
        timestamp: ctx.stub.getTxTimestamp(),
    };
};

export const updateState = async (ctx: Context, item: any, prefix: string) => {
    const dataAsBytes = await ctx.stub.getState(prefix + item.id);

    if (!dataAsBytes || dataAsBytes.length === 0) {
        throw new Error(`${item.id} does not exist.`);
    }

    let it = JSON.parse(dataAsBytes.toString());
    Object.assign(it, item);

    await ctx.stub.putState(prefix + it.id, Buffer.from(JSON.stringify(it)));

    console.info("Updated <--> ", it);
    return {
        status: "success",
        status_code: 200,
        data: it,
        message: "Update successful",
        txId: ctx.stub.getTxID(),
        timestamp: ctx.stub.getTxTimestamp(),
    };
};

export const deleteState = async (ctx: Context, id: any, prefix: string) => {
    const dataAsBytes = await ctx.stub.getState(prefix + id);

    if (!dataAsBytes || dataAsBytes.length === 0) {
        throw new Error(`${id} does not exist.`);
    }

    await ctx.stub
        .deleteState(prefix + id)
        .then((r) => {
            console.log(r);
        })
        .catch((e) => {
            console.log(e);
        });
    console.log("debug", prefix + id);

    console.info("Deleted <--> ", prefix + id);
    return {
        status: "success",
        status_code: 200,
        id,
        message: "Delete successful",
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

export const getHistory = async (ctx: Context, key: string, prefix: string) => {
    const promiseOfIterator = ctx.stub.getHistoryForKey(prefix + key);
    const results = [];
    for await (const keyMod of promiseOfIterator) {
        const resp: any = {
            timestamp: keyMod.timestamp,
            txId: keyMod.txId,
        };
        if (keyMod.isDelete) {
            resp.data = "KEY DELETED";
        } else {
            resp.data = JSON.parse(keyMod.value.toString());
        }
        results.push(resp);
    }
    return results;
};
