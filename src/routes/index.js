const Express = require("express");
const Router = Express.Router();
const Transaction = require("../controllers/Transaction.js");
const Hmac = require("../controllers/Index");

Router.post("/v1/new", Hmac.verifyHmac, Transaction.createTx);

Router.post("/v1/update", Hmac.verifyHmac, Transaction.atualizaSaldo);

Router.post("/v1/updateall", Transaction.updateAll);

Router.get("/v1/status", Transaction.statusTotal);

Router.get("/v1/unpaid", Transaction.unPaid);

Router.get("/v1/showall", Transaction.showAll);

Router.post("/v1/alreadypay", Transaction.alreadyPay);

module.exports = Router;
