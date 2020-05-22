import { Context } from "fabric-contract-api";
import { PrefixMaster } from "../PrefixMaster";

export const getAllResults = async (promiseOfIterator: any) => {
    const allResults = [];
    for await (const res of promiseOfIterator) {
        allResults.push(JSON.parse(res.value.toString()));
    }
    return allResults;
};

export const createOrUpdateState = async (
    ctx: Context,
    item: any,
    prefix: string
) => {
    let dataAsBytes = await ctx.stub.getState(
        prefix + (item.id ? item.id : item.code)
    );
    if (!dataAsBytes || dataAsBytes.length === 0) {
        //Create
        item.createdTime = new Date();
        if (item.updatedBy) {
            item.createdBy = item.updatedBy;
        }
        await ctx.stub.putState(
            prefix + (item.id ? item.id : item.code),
            Buffer.from(JSON.stringify(item))
        );
        console.info("Added <--> ", item);
    } else {
        // Update
        let it = JSON.parse(dataAsBytes.toString());
        Object.assign(it, item);

        it.updatedTime = new Date();
        await ctx.stub.putState(
            prefix + (it.id ? item.id : item.code),
            Buffer.from(JSON.stringify(it))
        );
        console.info("Updated <--> ", it);
    }
};

export const createState = async (ctx: Context, item: any, prefix: string) => {
    const dataAsBytes = await ctx.stub.getState(
        prefix + (item.id ? item.id : item.code)
    );
    if (dataAsBytes || dataAsBytes.length !== 0) {
        throw new Error(`${item.id ? item.id : item.code} is exist.`);
    }
    item.createdTime = new Date();
    if (item.updatedBy) {
        item.createdBy = item.updatedBy;
    }
    await ctx.stub.putState(
        prefix + (item.id ? item.id : item.code),
        Buffer.from(JSON.stringify(item))
    );
    console.info("Added <--> ", item);
};

export const updateState = async (ctx: Context, item: any, prefix: string) => {
    const dataAsBytes = await ctx.stub.getState(
        prefix + (item.id ? item.id : item.code)
    );
    if (!dataAsBytes || dataAsBytes.length === 0) {
        throw new Error(`${item.id ? item.id : item.code} does not exist.`);
    }
    let it = JSON.parse(dataAsBytes.toString());
    Object.assign(it, item);
    it.updatedTime = new Date();
    await ctx.stub.putState(
        prefix + (it.id ? item.id : item.code),
        Buffer.from(JSON.stringify(it))
    );
    console.info("Added <--> ", it);
};

// createOrUpdateState with prefix and validate with schema (yup)
export const setState = async (
    ctx: Context,
    data: any,
    prefix: string,
    schema: any,
    shouldCreate: boolean = true,
    shouldUpdate: boolean = true
) => {
    if (!Array.isArray(data)) {
        let dataValid = await schema
            .validate(schema.cast(data), { context: { ctx } })
            .catch((errors: any) => {
                throw new Error(errors);
            });
        if (shouldCreate && shouldUpdate) {
            await createOrUpdateState(ctx, dataValid, prefix);
        } else if (shouldUpdate && !shouldCreate) {
            await updateState(ctx, dataValid, prefix);
        } else if (!shouldUpdate && shouldCreate) {
            await createState(ctx, dataValid, prefix);
        } else {
            throw new Error(
                "shouldCreate and shouldUpdate should not false both"
            );
        }
    } else {
        for (let it of data) {
            let dataValid = await schema
                .validate(schema.cast(it), { context: { ctx } })
                .catch((errors: any) => {
                    throw new Error(errors);
                });
            if (shouldCreate && shouldUpdate) {
                await createOrUpdateState(ctx, dataValid, prefix);
            } else if (shouldUpdate && !shouldCreate) {
                await updateState(ctx, dataValid, prefix);
            } else if (!shouldUpdate && shouldCreate) {
                await createState(ctx, dataValid, prefix);
            } else {
                throw new Error(
                    "shouldCreate and shouldUpdate should not false both"
                );
            }
        }
    }
};

export const getState = async (ctx: Context, id: string, prefix: string) => {
    const dataAsBytes = await ctx.stub.getState(prefix + id);
    if (!dataAsBytes || dataAsBytes.length === 0) {
        throw new Error(`${id} does not exist`);
    }
    return JSON.parse(dataAsBytes.toString());
};

export const checkSubId = async (ctx: Context, id: string) => {};

export const isStateExist = async (
    ctx: Context,
    id: string,
    prefix: string
): Promise<boolean> => {
    const dataAsBytes = await ctx.stub.getState(prefix + id);
    if (!dataAsBytes || dataAsBytes.length === 0) {
        return false;
    }
    return true;
};

export const queryState = async (ctx: Context, queryString: string) => {
    let itr = ctx.stub.getQueryResult(queryString);
    let result = await getAllResults(itr);
    return result;
};
