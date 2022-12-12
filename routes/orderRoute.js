const express = require("express");
const router = express.Router();

const {
  getAllData,
  getOrderByStatus,
  updateOrderStatus,
} = require("../controller/orderController");

router.get("/alldata", getAllData);
router.get("/", getOrderByStatus);
router.post("/update/:id", updateOrderStatus);

module.exports = router;
