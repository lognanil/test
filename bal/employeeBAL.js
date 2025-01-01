const ip = require("ip");
const UAParser = require("ua-parser-js");
const crypto = require("crypto");
const sha512 = require("js-sha512");
const employeeDAL = require("../dal/employeeDAL");
const reqip = require("request-ip");
const parser = new UAParser();
const multer = require('multer');
const path = require('path');
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
    const result = await employeeDAL.getUserDetails();
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};


exports.getDeptDetails = async (req, res) => {
  try {
    const result = await employeeDAL.getDeptDetails();
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
    const result = await employeeDAL.submitDoc(req.body, req.session.userID);
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



exports.submitDocmentdetails = async (req, res) => {
  try {
    const url = req.protocol + '://' + req.get('host')
    let Storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, './public/documents');
      },
      filename: function (req, file, callback) {
        callback(null, req.session.userID + '-' + file.fieldname + '-' + Date.now() + path.extname(file.originalname));

      }
    });
    let fileFilter = (req, file, callback) => {
      const allowedMimeTypes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/jpg',
      ];
      // if (file.mimetype == 'application/pdf') {
        if (allowedMimeTypes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        callback(new Error('File Format Should be PDF or Image'));
      }
    }
    var upload = multer({ storage: Storage, fileFilter: fileFilter }).fields([
      { name: 'documentFile', maxCount: 1 }
    ]);
    upload(req, res, async err => {
      if (err) throw err;
      let mdata = JSON.parse(req.body.value);
      if (req.files.documentFile != undefined) {
        mdata.documentFileUrl = req.files.documentFile[0].path.replace('public', url);
      }
      mdata.IPAddress = ip.address();
      const result = await employeeDAL.submitDocmentdetails(mdata,req.session.userID);
      // employeeDAL.addActivityLog('/submitDocmentdetails', 'INSERT', 'POST', req.session.userID, ip.address(), getURL(req), req.device.type.toUpperCase(), `${parser.setUA(req.headers['user-agent']).getOS().name} ${parser.setUA(req.headers['user-agent']).getOS().version}`, `${parser.setUA(req.headers['user-agent']).getBrowser().name} ${parser.setUA(req.headers['user-agent']).getBrowser().version}`);
      res.send(result);

    });

  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};



exports.getDocumentDetails = async (req, res) => {
  try {
    const result = await employeeDAL.getDocumentDetails(req.session.userID);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};



exports.requestData = async (req, res) => {
  try {
    const result = await employeeDAL.requestData(req.body, req.session.userID);
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
    res.send([{ msg: 'true' }]);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};



exports.submitReuploadDocmentdetails = async (req, res) => {
  try {
    const result = await employeeDAL.submitReuploadDocmentdetails(req.body, req.session.userID);
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



exports.getdeptidData = async (req, res) => {
  try {
    const result = await employeeDAL.getdeptidData(req.session.userID);
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};