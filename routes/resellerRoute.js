const express = require("express");
const router = express.Router();


const {getAllReseller,updateReseller,deleteReseller} = require("../controller/ressellerController");

router.get("/alldata",getAllReseller);
router.put("/update/:id",updateReseller);
router.delete("/delete/:id",deleteReseller);

module.exports = router;
