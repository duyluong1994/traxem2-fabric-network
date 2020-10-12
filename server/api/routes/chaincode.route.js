const {
  getProd,
  getProdHistory,
  getLogsByProd,
  createProd,
  updateProd,
  getLog,
  createLog,
} = require("../controllers/chaincode.controller");
const ChainCodeRoutes = (app) => {
  app.route("/production/:id").get(getProd);
  app.route("/production/:id/block_history").get(getProdHistory);
  app.route("/production/:id/log").get(getLogsByProd);
  app.route("/production").post(createProd).put(updateProd);
  app.route("/activity_log/:id").get(getLog);
  app.route("/activity_log").post(createLog);
};
module.exports = { ChainCodeRoutes };
