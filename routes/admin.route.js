const express = require("express");
const router = express.Router();
const adminBAL = require("../bal/adminBAL");
router.post("/submitDoc", adminBAL.submitDoc);
router.get("/getUserDetails", adminBAL.getUserDetails);
router.get("/getDeptDetails", adminBAL.getDeptDetails);
router.get("/getPermissionDetails", adminBAL.getPermissionDetails);
router.get("/activeData/:data", adminBAL.activeData);
router.get("/getViewDetails", adminBAL.getViewDetails);
router.get("/verifiedData/:data", adminBAL.verifiedData);
router.get("/remarkData/:data/:remarkData", adminBAL.remarkData);
router.get("/getReamrkDetails", adminBAL.getReamrkDetails);
router.get("/getRequestDetails", adminBAL.getRequestDetails);
router.get("/approveRequest/:data", adminBAL.approveRequest);
module.exports = router;
