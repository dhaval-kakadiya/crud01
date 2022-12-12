const express = require("express");
const router = express.Router();

const {
  getAllVandor,
  getVendorById,
  getVendorByStatus,
  updateVendor,
} = require("../controller/vendorController");

router.get("/alldata", getAllVandor);
router.get("/:id", getVendorById);
router.get("/", getVendorByStatus);
router.post("/update/:id", updateVendor);

module.exports = router;
