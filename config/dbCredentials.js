


const dbCredentials = () => {
  const encodedUser = "dGVzdF9pcnFhX3VzZXI="; //test_irqa_user  // dGVzdF9pcnFhX3VzZXI=
  const encodedHost = "ZHBnLWN0aHJmbmQ2bDQ3YzczOGIwNDlnLWE=";
  const enCodedDatabase = "dGVzdF9pcnFh"; // test_irqa // dGVzdF9pcnFh
  const encodedPassword = "VjFHWVhlNk53N1g4NVJoNVJ1UU9OS01vZmt0b0U2Zmc="; // V1GYXe6Nw7X85Rh5RuQONKMofktoE6fg
  const encodedPort = "NTQzMg=="; //  5432 // NTQzMg==
  return {
    encodedUser, encodedHost, enCodedDatabase, encodedPassword, encodedPort
  };
};

exports.dbCredentials = dbCredentials;




