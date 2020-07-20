const { ErrorHandler } = require("../errors/error");
const getQrInfo = async (req, res, next) => {
  try {
    const { qrcode } = req.params;
    if (typeof qrcode.toString() !== "string") {
      throw new ErrorHandler(400, "QR Code must be a string.");
    }
    const evalResult = await FabricContract.evaluateTransaction(
      "get",
      qrcode.toString()
    );
    res.json(evalResult);
  } catch (e) {
    next(e);
  }
};
module.exports = { getQrInfo };
