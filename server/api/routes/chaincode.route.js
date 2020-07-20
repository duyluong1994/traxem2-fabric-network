const { getQrInfo } = require("../controllers/chaincode.controller");
const ChainCodeRoutes = (app) => {
  app.route("/qrcode/:qrcode").get(getQrInfo);
};
module.exports = { ChainCodeRoutes };
