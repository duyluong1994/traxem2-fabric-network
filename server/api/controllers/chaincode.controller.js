const { ErrorHandler } = require("../errors/error");

const createQR = async (req, res, next) => {
  try {
    const { qrCode, isCarton=false } = req.body;

    if(typeof isCarton != "boolean"){
	throw new ErrorHandler(400, "isCarton must be a boolean.");
    }

    const bufferResult = await FabricContract.submitTransaction("Qrcode:create", 
      JSON.stringify(qrCode),
      isCarton.toString(),
    );

    res.json({
      status: "success",
      status_code: 200,
      data: qrCode,
      ...JSON.parse(bufferResult.toString()),
    });

  } catch (e) {
    next(e);
  }
};

const updateQR = async (req, res, next) => {
  try {
    const { qrCode } = req.body;

    const bufferResult = await FabricContract.submitTransaction("Qrcode:update",
      JSON.stringify(qrCode)
    );

    res.json({
      status: "success",
      status_code: 200,
      data: qrCode,
      ...JSON.parse(bufferResult.toString()),
    });

  } catch (e) {
    next(e);
  }
};

const linkQR = async (req, res, next) => {
  try {
    const { body, carton, user } = req.body;

    const bufferResult = await FabricContract.submitTransaction("Qrcode:link",
      body,
      carton,
      JSON.stringify(user)
    );

    res.json({
      status: "success",
      status_code: 200,
      data: {body, carton, user},
      ...JSON.parse(bufferResult.toString()),
    });

  } catch (e) {
    next(e);
  }
};

const addHistoryData = async (req, res, next) => {
  try {
    const { qrCode, action, user } = req.body;

    const bufferResult = await FabricContract.submitTransaction("Qrcode:addHistoryData",
      qrCode,
      JSON.stringify(action),
      JSON.stringify(user)
    );

    res.json({
      status: "success",
      status_code: 200,
      data: {qrCode, action, user},
      ...JSON.parse(bufferResult.toString()),
    });

  } catch (e) {
    next(e);
  }
};

const getQrInfo = async (req, res, next) => {
  try {
    const { qrCode } = req.params;
    if (typeof qrCode.toString() !== "string") {
      throw new ErrorHandler(400, "QR Code must be a string.");
    }
    const evalResult = await FabricContract.evaluateTransaction(
      "Qrcode:get",
      qrCode.toString()
    );

    res.json({
      status: "success",
      status_code: 200,
      message: "request successful",
      data: JSON.parse(evalResult.toString()),
    });
  } catch (e) {
    next(e);
  }
};

const getQrHistory = async (req, res, next) => {
  try {
    const { qrCode } = req.params;
    if (typeof qrCode.toString() !== "string") {
      throw new ErrorHandler(400, "QR Code must be a string.");
    }
    const evalResult = await FabricContract.evaluateTransaction(
      "Qrcode:getHistory",
      qrCode.toString()
    );

    if (evalResult.toString().length <= 0) {
      res.json({
        status: "success",
        status_code: 200,
        message: "request successful",
        data: { carton: [], body: [] },
      });
    }

    res.json({
      status: "success",
      status_code: 200,
      message: "request successful",
      data: JSON.parse(evalResult.toString()),
    });
  } catch (e) {
    next(e);
  }
};
module.exports = { getQrInfo, getQrHistory, createQR, updateQR, linkQR, addHistoryData };
