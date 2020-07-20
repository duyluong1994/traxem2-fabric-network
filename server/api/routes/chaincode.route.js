const {
  getQrInfo,
  getQrHistory,
  createQR,
} = require("../controllers/chaincode.controller");
const ChainCodeRoutes = (app) => {
  app.route("/qrcode").post(createQR);
  app.route("/qrcode/:qrcode").get(getQrInfo);
  app.route("/qrcode/history/:qrcode").get(getQrHistory);
};
module.exports = { ChainCodeRoutes };
