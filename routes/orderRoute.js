const express = require("express");
const router = express.Router();

const {
  getAllData,
  getOrderByStatus,
  updateOrderStatus,
  getOrderByVendorId,
  getOrderByResellerId
} = require("../controller/orderController");

router.get("/alldata", getAllData);
router.get("/", getOrderByStatus);
router.get("/vendor-order/:id", getOrderByVendorId);
router.get("/reseller-order/:id", getOrderByResellerId);
router.post("/update/:id", updateOrderStatus);

module.exports = router;
