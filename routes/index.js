const express = require("express");
const router = express.Router();

const orderRoute = require("./orderRoute");
const vandorRoute = require("./vandorRoute");
const resellerRoute = require("./resellerRoute");

router.use("/order", orderRoute);
router.use("/reseller", resellerRoute);
router.use("/vendor", vandorRoute);

module.exports = router;
