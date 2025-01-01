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

exports.submitDoc = (data, userID) =>
  new Promise(async (resolve, reject) => {
    const client = await pool.connect().catch((err) => {
      reject(new Error(`Unable to connect to the database: ${err}`));
    });
    try {
      // When the Employee enters a user's document, the document's status is '0'.
      await client.query("begin");
      const query1 = `INSERT INTO public."Registration"("userId", "userName", "userEmail", "userTypeId", "userDeptId", "userContactNo", "userAltContactNo", "userPanNo", "userPassportNo", "userPassword", "userConPass", "userEmployeeId","Status")
	    VALUES ('${userID}', '${data.Name}', '${data.Email}',  '${data.userType}','${data.department}' , '${data.contactNumber}',  '${data.alternateNumber}', '${data.pancard}', '${data.passport}', '${data.password}', '${data.confirmPassword}', '${data.employeeId}','0');`;
      const response1 = await client.query(query1);
      await client.query("commit");
      resolve(true);
    } catch (e) {
      await client.query("rollback");
      reject(new Error(`Oops! An error occurred: ${e}`));
    } finally {
      client.release();
    }
  });

// exports.submitDocmentdetails = (data, userID) =>
//   new Promise(async (resolve, reject) => {
//     const client = await pool.connect().catch((err) => {
//       reject(new Error(`Unable to connect to the database: ${err}`));
//     });
//     try {
//       console.log(data,'datadata')
//       await client.query("begin");
//       const query1 = `INSERT INTO public."documentTbl"(
// 	   "userId", "docName", "docPath", "docStatus", "DateTime", "Remark","docId","permissionStatus")
// 	    VALUES ('${userID}', '${data.docName}', '${data.file}','1', NOW(), '${data.description}','${data.docId}','0');`;
//       const response1 = await client.query(query1);
//       await client.query("commit");
//       resolve(true);
//     } catch (e) {
//       await client.query("rollback");
//       reject(new Error(`Oops! An error occurred: ${e}`));
//     } finally {
//       client.release();
//     }
//   });


exports.submitDocmentdetails = (data, userID) =>
  new Promise(async (resolve, reject) => {
    const client = await pool.connect().catch((err) => {
      reject(new Error(`Unable to connect to the database: ${err}`));
    });
    try {
      // console.log(data,'userrrrr');
      await client.query("begin");
      const query1 = `INSERT INTO public."documentTbl"(
	   "userId", "docName", "docPath", "docStatus", "DateTime", "Remark","docId")
	    VALUES ('${userID}', '${data.documentName}', '${data.documentFileUrl}','1', NOW(), '${data.description}','${data.docId}');`;
      const response1 = await client.query(query1);
      await client.query("commit");
      resolve(true);
    } catch (e) {
      await client.query("rollback");
      reject(new Error(`Oops! An error occurred: ${e}`));
    } finally {
      client.release();
    }
});

exports.getDocumentDetails = (userID) =>
  new Promise(async (resolve, reject) => {
    const client = await pool.connect().catch((err) => {
      reject(new Error(`Unable to connect to the database: ${err}`));
    });
    try {
      const query = `select a."docName",a."docId",b."userName",b."userEmployeeId",b."userDeptId",b."DateTime",b."Remark",a."docPath"  from "documentTbl" a 
       inner join "Registration" b on a."userId" = b."userId"
      where  a."userId" ='${userID}';`
      // b."permissionStatus" in ('0','1') and
      const response = await client.query(query);
      resolve(response.rows);
    } catch (e) {
      reject(new Error(`Oops! An error occurred: ${e}`));
    } finally {
      client.release();
    }
  });



  exports.requestData = (data, userID) =>
    new Promise(async (resolve, reject) => {
      const client = await pool.connect().catch((err) => {
        reject(new Error(`Unable to connect to the database: ${err}`));
      });
      try {
        await client.query("begin");
        const query1 = `update "documentTbl" set "RequestMsg"='${data. reply}',"RequestStatus"='0' where "userId"='${userID}' and "docId"='${data.id}'`;
        const response1 = await client.query(query1);
        await client.query("commit");
        resolve(true);
      } catch (e) {
        await client.query("rollback");
        reject(new Error(`Oops! An error occurred: ${e}`));
      } finally {
        client.release();
      }
    });



    
exports.submitReuploadDocmentdetails = (data, userID) =>
  new Promise(async (resolve, reject) => {
    const client = await pool.connect().catch((err) => {
      reject(new Error(`Unable to connect to the database: ${err}`));
    });
    try {
      await client.query("begin");
      const query1 = `update "documentTbl" set "userId"='${userID}', "docName"='${data.documentName}', "docPath"='${data.attachedDocument}', "Remark"='${data.description}' where "RequestStatus"='1';`;
      const response1 = await client.query(query1);
      await client.query("commit");
      resolve(true);
    } catch (e) {
      await client.query("rollback");
      reject(new Error(`Oops! An error occurred: ${e}`));
    } finally {
      client.release();
    }
  });


  
exports.getdeptidData = (userID) =>
  new Promise(async (resolve, reject) => {
    const client = await pool.connect().catch((err) => {
      reject(new Error(`Unable to connect to the database: ${err}`));
    });
    try {
      const query = `select distinct a."docName",a."docNameId",b."docStatus" from public."docNameMaster" a 
      left join "documentTbl" b on a."docNameId"=b."docId" and  b."userId"='${userID}'`
      const response = await client.query(query);
      resolve(response.rows);
    } catch (e) {
      reject(new Error(`Oops! An error occurred: ${e}`));
    } finally {
      client.release();
    }
  });
