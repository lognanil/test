const express = require("express");
const router = express.Router();
const pageBAL = require("../bal/pageBAL");
router.post("/submitDoc", pageBAL.submitDoc);
router.get("/getUserDetails", pageBAL.getUserDetails);
router.get("/getDeptDetails", pageBAL.getDeptDetails);
module.exports = router;