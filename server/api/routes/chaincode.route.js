const {
  getQrInfo,
  getQrHistory,
  createQR,
  updateQR,
  linkQR,
  addHistoryData
} = require("../controllers/chaincode.controller");
const ChainCodeRoutes = (app) => {
  app.route("/qrcode").post(createQR).put(updateQR);
  app.route("/qrcode/link").post(linkQR);
  app.route("/qrcode/addHistoryData").post(addHistoryData);
  app.route("/qrcode/:qrCode").get(getQrInfo);
  app.route("/qrcode/history/:qrCode").get(getQrHistory);
};
module.exports = { ChainCodeRoutes };
