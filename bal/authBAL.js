const ip = require("ip");
const UAParser = require("ua-parser-js");
const crypto = require("crypto");
const sha512 = require("js-sha512");
const authDAL = require("../dal/authDAL");
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

const generateRandomNumber = () => {
  const buf = crypto.randomBytes(16);
  return buf.toString("hex");
};

exports.generateCaptchaAndSalt = (req, res) => {
  let code = "";
  try {
    
    switch (req.params.type) {
      case "1": {
        const char =
          Math.random().toString(24).substring(2, req.params.length) +
          Math.random().toString(24).substring(2, 4);
        req.session.captcha = char.toUpperCase();
        code = char.toUpperCase();
        break;
      }
      case "2": {
        // const num = Math.floor(Math.random() * (max - min + 1)) + min; // Returns an integer random number between min (included) and max (included)
        //changed
        let captcha = new Array();
        for (q = 0; q < 6; q++) {
          if (q % 2 == 0) {
            captcha[q] = String.fromCharCode(
              Math.floor(Math.random() * 26 + 65)
            );
          } else {
            captcha[q] = Math.floor(Math.random() * 10 + 0);
          }
        }
        captcha[0] = captcha[0].toLowerCase();
        captcha[4] = captcha[4].toLowerCase();
        code = captcha.join("");
        req.session.captcha = code;

        break;
      }
      default: {
      }
    }
    req.session.salt = !req.session.salt
      ? generateRandomNumber()
      : req.session.salt;
    res.send({
      code,
      resultCode: req.session.captcha,
      salt: req.session.salt,
    });
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

exports.signIn = async (req, res) => {
 
  try {
    if (req.body.captcha === req.session.captcha) {
      const result = await authDAL.getUserDetails(req.body.userID);
      if (result.length > 0) {
       
        if (
          sha512(result[0].PasswordHash + req.session.salt) ===
          req.body.password
        ) {
          req.session.role = result[0].RoleName;
          req.session.userID = req.body.userID;
          req.session.username = result[0].Username;
          req.session.cookie.maxAge = 1800000;
          req.session.salt = generateRandomNumber();
          const tempSession = req.session;
          req.session.regenerate((err) => {
            Object.assign(req.session, tempSession);
          });

          authDAL.addActivityLog(
            "/signIn",
            "SELECT",
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
          req.session.save((err) => {
            res.send({
              username: req.session.userID,
              role: req.session.role,
              message: true,
            });
          });
        } else {
          res.send({
            message: "Invalid Username or Password for this User.",
          });
        }
      } else {
        res.send({
          message: "Invalid Username or Password.",
        });
      }
    } else {
      res.send({
        message: "Invalid Captcha.",
      });
    }
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};

// exports.getUserDetails = (req, res) => {
//   try {
//     if (
//       req.session.userID === req.params.username &&
//       req.session.role === req.params.role
//     ) {
//       res.send({
//         isLoggedIn: true,
//       });
//     } else {
//       req.session.destroy();
//       res.send({
//         isLoggedIn: false,
//       });
//     }
//   } catch (e) {
//     res.status(500).send(e);
//     throw e;
//   }
// };

exports.signOut = (req, res) => {
  try {
    req.session.destroy();
    res.send({
      message: true,
    });
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};


exports.forgetPaasword = async (req, res) => {
  try {
    const result = await authDAL.getUserDetails(req.body.userID);
    req.session.salt = generateRandomNumber();
    if (result.length === 0) {
      res.send([{ msg: 'Please try again' }]);
      return;
    }
    req.body.IPAddress = ip.address();
    let data = {
      userID: req.body.userID,
      confirmPassword: req.body.confirmPassword,
      IPAddress:ip.address()
    };
    await authDAL.forgetPaasword(data);
    res.send([{ msg: 'true' }]);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};



exports.getUserDetails = (req, res) => {
  try {
      // req.session.userID && === req.params.username &&
      // req.session.role === req.params.role
    if (
      req.session.userID &&
      req.session.role === req.params.role
    ) {
      res.send({
        isLoggedIn: true,
      });
    } else {
      req.session.destroy();
      res.send({
        isLoggedIn: false,
      });
    }
  } catch (e) {
    res.status(500).send(e);
    throw e;
  }
};