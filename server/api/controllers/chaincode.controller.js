const { ErrorHandler } = require("../errors/error");

const createQR = async (req, res, next) => {
  try {
    const { qrcode, isCarton } = req.body;

    const evalResult = await FabricContract.submitTransaction(
      "Qrcode:create",
      JSON.stringify(qrcode),
      isCarton
    );
    console.log(evalResult);
    res.json({
      status: "success",
      status_code: 200,
      message: "QR created",
      data: qrcode,
    });
  } catch (e) {
    next(e);
  }
};

const getQrInfo = async (req, res, next) => {
  try {
    const { qrcode } = req.params;
    if (typeof qrcode.toString() !== "string") {
      throw new ErrorHandler(400, "QR Code must be a string.");
    }
    const evalResult = await FabricContract.evaluateTransaction(
      "Qrcode:get",
      qrcode.toString()
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
    const { qrcode } = req.params;
    if (typeof qrcode.toString() !== "string") {
      throw new ErrorHandler(400, "QR Code must be a string.");
    }
    const evalResult = await FabricContract.evaluateTransaction(
      "Qrcode:getHistory",
      qrcode.toString()
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
module.exports = { getQrInfo, getQrHistory, createQR };
