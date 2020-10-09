const { ErrorHandler } = require("../errors/error");

const createProd = async (req, res, next) => {
  try {
    const data = req.body;
    const bufferResult = await FabricContract.submitTransaction(
      "Qrcode:createProd",
      JSON.stringify(data)
    );

    res.json({
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
      ...JSON.parse(evalResult.toString()),
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
      ...JSON.parse(evalResult.toString()),
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
      ...JSON.parse(evalResult.toString()),
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
      ...JSON.parse(evalResult.toString()),
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
      ...JSON.parse(evalResult.toString()),
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
