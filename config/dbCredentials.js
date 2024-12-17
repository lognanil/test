


const dbCredentials = () => {
  const encodedUser = 'cG9zdGdyZXM='; //postgres
  const encodedHost = 'bG9jYWxob3N0'; // local
  const enCodedDatabase = 'VGVzdA=='; // DMS  RE1T//  Test VGVzdA==
  const encodedPassword = 'c3JpcmFt' //arati password cGFzc3dvcmQ=//sriram   c3JpcmFt
  const encodedPort = 'NTQzMg=='; // arati / 5432
  return {
    encodedUser, encodedHost, enCodedDatabase, encodedPassword, encodedPort
  };
};

exports.dbCredentials = dbCredentials;



