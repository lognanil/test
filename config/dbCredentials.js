const dbCredentials = () => {
   const encodedUser = "dGVzdF9pcnFhX3VzZXI"; //test_irqa_user  // dGVzdF9pcnFhX3VzZXI=
  const encodedHost =
    "V1GYXe6Nw7X85Rh5RuQONKMofktoE6fg@dpg-cthrfnd6l47c738b049g-a"; // V1GYXe6Nw7X85Rh5RuQONKMofktoE6fg@dpg-cthrfnd6l47c738b049g-a
  const enCodedDatabase = "dGVzdF9pcnFh"; // test_irqa // dGVzdF9pcnFh
  const encodedPassword = "V1GYXe6Nw7X85Rh5RuQONKMofktoE6fg"; // V1GYXe6Nw7X85Rh5RuQONKMofktoE6fg
  const encodedPort = "NTQzMg=="; //  5432 // NTQzMg==
  return {
    encodedUser,
    encodedHost,
    enCodedDatabase,
    encodedPassword,
    encodedPort,
  };
};

exports.dbCredentials = dbCredentials;

// const encodedUser = 'cG9zdGdyZXM='; //postgres
// const encodedHost = 'bG9jYWxob3N0'; // local
// const enCodedDatabase = 'VGVzdA=='; // DMS  RE1T//  Test VGVzdA==
// const encodedPassword = 'c3JpcmFt' //arati password cGFzc3dvcmQ=//sriram   c3JpcmFt
// const encodedPort = 'NTQzMg=='; // arati / 5432
