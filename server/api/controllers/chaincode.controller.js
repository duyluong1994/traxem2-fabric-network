const { ErrorHandler } = require("../errors/error");
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
    res.json(JSON.parse(evalResult.toString()));
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
    console.log(evalResult.toString())
    res.json(JSON.parse(evalResult.toString()));
  } catch (e) {
    next(e);
  }
};
module.exports = { getQrInfo, getQrHistory };
