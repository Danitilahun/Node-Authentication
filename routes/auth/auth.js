const express = require("express");
const registerController = require("../../controllers/auth/register");
const activationController = require("../../controllers/auth/activation");
const router = express.Router();

router.post("/register", registerController);
router.post("/activate", activationController);
module.exports = router;
