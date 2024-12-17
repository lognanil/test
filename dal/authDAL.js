const format = require("pg-format");
const pool = require("../config/dbConfig");

exports.addActivityLog = async (
  action,
  attack,
  mode,
  userID,
  ipAddress,
  url,
  deviceType,
  os,
  browser
) => {
  const client = await pool.connect().catch((err) => {
   
  });
  try {
    const query = `insert into "ActivityLog" ("IPAddress", "UserID", "URL", "DeviceType", "OS", "Browser", "DateTime", "Action", "Attack", "Mode") values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
    const values = [
      ipAddress,
      userID,
      url,
      deviceType,
      os,
      browser,
      "now()",
      action,
      attack,
      mode,
    ];
    await client.query(query, values);
  } catch (e) {
   
  } finally {
    client.release();
  }
};

exports.getUserDetails = (userID) =>
  new Promise(async (resolve, reject) => {
    const client = await pool.connect().catch((err) => {
      reject(new Error(`Unable to connect to the database: ${err}`));
    });
    try {
     
      let query =  `SELECT "UserID","PasswordHash", b."RoleName", "AccessFailedCount", "IsLoggedIn", "Status" from "UserLogin" a inner join "UserRole" b on a."RoleID" = b."RoleID" where "UserID"= $1`;
      
      const values = [userID];
      const response = await client.query(query, values);
      resolve(response.rows);
    } catch (e) {
      reject(new Error(`Oops! An error occurred: ${e}`));
    } finally {
      client.release();
    }
});

exports.forgetPaasword = (data) => new Promise(async (resolve, reject) => {
 
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    await client.query('begin');
    const query = `UPDATE "UserLogin" SET  "PasswordHash"='${data.confirmPassword}',"ResetDateTime"='NOW()' where "UserID"= '${data.userID}'`;
    const response = await client.query(query);
    
    await client.query('commit');
    resolve(true);
  } catch (e) {
    await client.query('rollback');
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});