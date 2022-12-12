const express = require("express");
const router = express.Router();

const {
  getAllReseller,
  updateReseller,
  addfollowReq,
  removefollowReq,
  deleteReseller,
} = require("../controller/ressellerController");

router.get("/alldata", getAllReseller);
router.post("/update/:id", updateReseller);
router.post("/addvendor/:id", addfollowReq);
router.post("/removevendor/:id", removefollowReq);
router.delete("/delete/:id", deleteReseller);

module.exports = router;
