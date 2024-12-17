const ip = require("ip");
const UAParser = require("ua-parser-js");
const crypto = require("crypto");
const sha512 = require("js-sha512");
const pageDAL = require("../dal/pageDAL");
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
    const result = await pageDAL.submitDoc(req.body, req.session.userID);
    pageDAL.addActivityLog(
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
    const result = await pageDAL.getUserDetails();
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};


exports.getDeptDetails = async (req, res) => {
  try {
   
    const result = await pageDAL.getDeptDetails();
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};
