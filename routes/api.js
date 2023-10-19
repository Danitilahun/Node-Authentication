const express = require("express");
const router = express.Router();

const customer = require("./auth/auth");
router.use("/customer", customer);
module.exports = router;
