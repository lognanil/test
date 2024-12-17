const ip = require("ip");
const UAParser = require("ua-parser-js");
const crypto = require("crypto");
const sha512 = require("js-sha512");
const adminDAL = require("../dal/adminDAL");
const reqip = require("request-ip");
const parser = new UAParser();

const getFinancialYear = () => {
  const today = new Date();
  const financialYear =
    today.getMonth() + 1 <= 3
      ? `${today.getFullYear() - 1}-${today
          .getFullYear()
          .toString()
          .substr(2, 3)}`
      : `${today.getFullYear()}-${(today.getFullYear() + 1)
          .toString()
          .substr(2, 3)}`;
  return financialYear;
};

const getURL = (req) => {
  const fullURL = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  return fullURL;
};

exports.submitDoc = async (req, res) => {
  try {
    req.body.userId = req.session.userId;
    req.body.financialYear = getFinancialYear();
    const result = await adminDAL.submitDoc(req.body, req.session.userID);
    adminDAL.addActivityLog(
      "/submitDoc",
      "INSERT",
      "POST",
      req.session.userID,
      ip.address(),
      getURL(req),
      `${parser.setUA(req.headers["user-agent"]).getOS().name} ${
        parser.setUA(req.headers["user-agent"]).getOS().version
      }`,
      `${parser.setUA(req.headers["user-agent"]).getBrowser().name} ${
        parser.setUA(req.headers["user-agent"]).getBrowser().version
      }`
    );
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const result = await adminDAL.getUserDetails();
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.getDeptDetails = async (req, res) => {
  try {
    const result = await adminDAL.getDeptDetails();
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.getPermissionDetails = async (req, res) => {
  try {
    const result = await adminDAL.getPermissionDetails();
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.activeData = async (req, res) => {
  try {
    const result = await adminDAL.activeData(req.params);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.getViewDetails = async (req, res) => {
  try {
    const result = await adminDAL.getViewDetails();
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.verifiedData = async (req, res) => {
  try {
    const result = await adminDAL.verifiedData(req.params);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.remarkData = async (req, res) => {
  try {
    const result = await adminDAL.remarkData(req.params);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.getReamrkDetails = async (req, res) => {
  try {
    const result = await adminDAL.getReamrkDetails();
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.getRequestDetails = async (req, res) => {
  try {
    const result = await adminDAL.getRequestDetails();
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.approveRequest = async (req, res) => {
  try {
    const result = await adminDAL.approveRequest(req.params);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};