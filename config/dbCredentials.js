const dbCredentials = () => {
  const encodedUser = "test_irqa_user"; //test_irqa_user
  const encodedHost =
    "V1GYXe6Nw7X85Rh5RuQONKMofktoE6fg@dpg-cthrfnd6l47c738b049g-a"; // V1GYXe6Nw7X85Rh5RuQONKMofktoE6fg@dpg-cthrfnd6l47c738b049g-a
  const enCodedDatabase = "test_irqa"; // test_irqa
  const encodedPassword = "V1GYXe6Nw7X85Rh5RuQONKMofktoE6fg"; // V1GYXe6Nw7X85Rh5RuQONKMofktoE6fg
  const encodedPort = "5432"; //  5432
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
