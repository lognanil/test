const express = require("express");
const router = express.Router();
const staffBAL = require("../bal/staffBAL");
router.get("/getUserDetails", staffBAL.getUserDetails);
router.post("/submitDoc", staffBAL.submitDoc);
router.get("/getDeptDetails", staffBAL.getDeptDetails);
router.post("/submitDocmentdetails", staffBAL.submitDocmentdetails);
router.get("/getDocumentDetails", staffBAL.getDocumentDetails);
router.post("/requestData", staffBAL.requestData);
router.post("/submitReuploadDocmentdetails", staffBAL.submitReuploadDocmentdetails);
router.get("/getdeptidData", staffBAL.getdeptidData);
module.exports = router;
