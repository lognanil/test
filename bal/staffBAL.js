const ip = require("ip");
const UAParser = require("ua-parser-js");
const crypto = require("crypto");
const sha512 = require("js-sha512");
const staffDAL = require("../dal/staffDAL");
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

exports.getUserDetails = async (req, res) => {
  try {
    const result = await staffDAL.getUserDetails();
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.submitDoc = async (req, res) => {
  try {
    req.body.userId = req.session.userId;
    req.body.financialYear = getFinancialYear();
    const result = await staffDAL.submitDoc(req.body, req.session.userID);
    staffDAL.addActivityLog(
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

exports.submitDocmentdetails = async (req, res) => {
  try {
   
    
    // req.body.userId = req.session.userId;
    req.body.financialYear = getFinancialYear();
    const result = await employeeDAL.staffDAL(req.body, req.session.userID);
    employeeDAL.addActivityLog(
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