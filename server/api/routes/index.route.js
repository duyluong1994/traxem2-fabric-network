const IndexRoutes = (app) => {
  app.get("/", (req, res, next) => {
    res.send("Welcome to LIXIL's ChainCode API.");
  });
};
module.exports = { IndexRoutes };
