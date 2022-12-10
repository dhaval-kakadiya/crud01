const express = require("express");
const router = express.Router();

const {getAllData} = require("../controller/orderController");

router.get("/alldata",getAllData);




module.exports = router;
