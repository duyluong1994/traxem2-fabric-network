const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const { FabricService } = require("./services/fabric.service");

const { handleError } = require("./errors/error");
const { IndexRoutes } = require("./routes/index.route");
const { ChainCodeRoutes } = require("./routes/chaincode.route");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Register routes
IndexRoutes(app);
ChainCodeRoutes(app);

// error handler
app.use((err, req, res, next) => {
  handleError(err, res);
});
// Fabric
FabricService().then(() => {
  console.log(
    "Init Fabric Gateway successful with global scope: FabricGateway, FabricNetwork, FabricContract"
  );
});

module.exports = app;
