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

exports.submitDoc = (data) =>
  new Promise(async (resolve, reject) => {
    const client = await pool.connect().catch((err) => {
      reject(new Error(`Unable to connect to the database: ${err}`));
    });
    // When the admin enters a user's document, the document's status is null.
    try {
      
      await client.query("begin");
      const query1 = `INSERT INTO public."Registration"("userId", "userName", "userEmail", "userTypeId", "userDeptId", "userContactNo", "userAltContactNo", "userPanNo", "userPassportNo", "userPassword", "userEmployeeId","Status","DateTime")
	    VALUES ('${data.employeeId}', '${data.Name}', '${data.Email}',  '${data.userType}','${data.department}' , '${data.contactNumber}',  '${data.alternateNumber}', '${data.pancard}', '${data.passport}','${data.confirmPassword}', '${data.employeeId}','0',NOW());`;
      const response1 = await client.query(query1);
      if (data.employeeId == 'Emp') {
        const query = `INSERT INTO public."UserLogin"(
          "UserID", "PasswordHash", "RoleID", "IsLoggedIn", "Status", "DateTime", "FinancialYear")
           VALUES ('${data.employeeId}', 'b42458de550ef94801e7df33778c436d93bb78d3962f1020f3659db75b72cb8e3a4bb75f972c500d5a3626f74f6b69436d515b55a0344c4b29f28ad0cba56c3b','Role-2', false, false, NOW(),'2024-25');`
        const response = await client.query(query);
      } else {
      const query = `INSERT INTO public."UserLogin"("UserID", "PasswordHash", "RoleID", "IsLoggedIn", "Status", "DateTime", "FinancialYear")
      VALUES ('${data.employeeId}', 'b42458de550ef94801e7df33778c436d93bb78d3962f1020f3659db75b72cb8e3a4bb75f972c500d5a3626f74f6b69436d515b55a0344c4b29f28ad0cba56c3b','Role-3', false, false, NOW(),'2024-25');`
      const response = await client.query(query);
      }
      await client.query("commit");
      resolve(true);
    } catch (e) {
      await client.query("rollback");
      reject(new Error(`Oops! An error occurred: ${e}`));
    } finally {
      client.release();
    }
});

exports.getUserDetails = () =>
  new Promise(async (resolve, reject) => {
    const client = await pool.connect().catch((err) => {
      reject(new Error(`Unable to connect to the database: ${err}`));
    });
    try {
      const query = `SELECT "userId", "docId", "docName", "docPath", "docStatus", "DateTime", "Remark"
	    FROM public."documentTbl";`;
      const response = await client.query(query);
      resolve(response.rows);
    } catch (e) {
      reject(new Error(`Oops! An error occurred: ${e}`));
    } finally {
      client.release();
    }
});

exports.getDeptDetails = () =>
  new Promise(async (resolve, reject) => {
    const client = await pool.connect().catch((err) => {
      reject(new Error(`Unable to connect to the database: ${err}`));
    });
    try {
      const query = `SELECT "deptId", "deptName" FROM public."Dept";`;
      const response = await client.query(query);
      resolve(response.rows);
    } catch (e) {
      reject(new Error(`Oops! An error occurred: ${e}`));
    } finally {
      client.release();
    }
});