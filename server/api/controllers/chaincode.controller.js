const { ErrorHandler } = require("../errors/error");

const createProd = async (req, res, next) => {
  try {
    const data = req.body;
    console.log("data", data);
    const bufferResult = await FabricContract.submitTransaction(
      "Qrcode:createProd",
      JSON.stringify(data)
    );

    console.log("debug", JSON.stringify(data));
    res.json({
      status: "success",
      status_code: 200,
      data: data,
      ...JSON.parse(bufferResult.toString()),
    });
  } catch (e) {
    next(e);
  }
};

const updateProd = async (req, res, next) => {
  try {
    const data = req.body;

    const bufferResult = await FabricContract.submitTransaction(
      "Qrcode:updateProd",
      JSON.stringify(data)
    );

    res.json({
      status: "success",
      status_code: 200,
      data: data,
      ...JSON.parse(bufferResult.toString()),
    });
  } catch (e) {
    next(e);
  }
};

const deleteProd = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (typeof id.toString() !== "string") {
      throw new ErrorHandler(400, "ID must be a string.");
    }
    const evalResult = await FabricContract.evaluateTransaction(
      "Qrcode:deleteProd",
      id.toString()
    );

    res.json({
      status: "success",
      status_code: 200,
      message: "Delete successful",
      data: JSON.parse(evalResult.toString()),
    });
  } catch (e) {
    next(e);
  }
};

const getProd = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (typeof id.toString() !== "string") {
      throw new ErrorHandler(400, "ID must be a string.");
    }
    const evalResult = await FabricContract.evaluateTransaction(
      "Qrcode:getProd",
      id.toString()
    );

    res.json({
      status: "success",
      status_code: 200,
      message: "Request successful",
      data: JSON.parse(evalResult.toString()),
    });
  } catch (e) {
    next(e);
  }
};

const createLog = async (req, res, next) => {
  try {
    const data = req.body;

    const bufferResult = await FabricContract.submitTransaction(
      "Qrcode:createLog",
      JSON.stringify(data)
    );

    res.json({
      status: "success",
      status_code: 200,
      data,
      ...JSON.parse(bufferResult.toString()),
    });
  } catch (e) {
    next(e);
  }
};

const getLog = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (typeof id.toString() !== "string") {
      throw new ErrorHandler(400, "ID must be a string.");
    }
    const evalResult = await FabricContract.evaluateTransaction(
      "Qrcode:getLog",
      id.toString()
    );

    res.json({
      status: "success",
      status_code: 200,
      message: "Request successful",
      data: JSON.parse(evalResult.toString()),
    });
  } catch (e) {
    next(e);
  }
};

const getLogsByProd = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (typeof id.toString() !== "string") {
      throw new ErrorHandler(400, "ID must be a string.");
    }
    const evalResult = await FabricContract.evaluateTransaction(
      "Qrcode:getLogsByProd",
      id.toString()
    );

    res.json({
      status: "success",
      status_code: 200,
      message: "Request successful",
      data: JSON.parse(evalResult.toString()),
    });
  } catch (e) {
    next(e);
  }
};

const getProdHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (typeof id.toString() !== "string") {
      throw new ErrorHandler(400, "ID must be a string.");
    }
    const evalResult = await FabricContract.evaluateTransaction(
      "Qrcode:getProdHistory",
      id.toString()
    );

    res.json({
      status: "success",
      status_code: 200,
      message: "Request successful",
      data: JSON.parse(evalResult.toString()),
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getProd,
  getProdHistory,
  getLogsByProd,
  createProd,
  updateProd,
  deleteProd,
  getLog,
  createLog,
};
