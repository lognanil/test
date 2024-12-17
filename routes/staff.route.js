const express = require("express");
const router = express.Router();
const staffBAL = require("../bal/staffBAL");
router.get("/getUserDetails", staffBAL.getUserDetails);
router.post("/submitDoc", staffBAL.submitDoc);
router.post("/submitDocmentdetails", staffBAL.submitDocmentdetails);
module.exports = router;
