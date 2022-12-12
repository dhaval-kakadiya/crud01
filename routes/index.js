const express = require("express");
const router = express.Router();

const orderRoute = require("./orderRoute");
const vendorRoute = require("./vendorRoute");
const resellerRoute = require("./resellerRoute");

router.use("/order", orderRoute);
router.use("/reseller", resellerRoute);
router.use("/vendor", vendorRoute);

module.exports = router;
