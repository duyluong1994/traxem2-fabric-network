const {
  getQrInfo,
  getQrHistory,
  createQR,
} = require("../controllers/chaincode.controller");
const ChainCodeRoutes = (app) => {
  app.route("/qrcode").post(createQR);
  app.route("/qrcode/:qrCode").get(getQrInfo);
  app.route("/qrcode/history/:qrCode").get(getQrHistory);
};
module.exports = { ChainCodeRoutes };
