const express = require("express");
const router = express.Router();

const {getAllVandor} = require("../controller/vandorController");

router.get("/alldata",getAllVandor);

module.exports = router;
