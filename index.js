const express = require("express");
const app = express();
const path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
var http = require("http");
const fs = require("fs");
const authRouter = require("./routes/auth.route");
const adminRouter = require("./routes/admin.route");
const employeeRouter = require("./routes/employee.route");
const staffRouter = require("./routes/staff.route");
const pageRouter = require("./routes/pages.route");
const logger = require("morgan");
const server = http.createServer(app);
const debug = require("debug")("server:server");
// const { sequelize } = require('./config/');
const sessionObject = {
  secret: "Secret is always secret. Dont tell anyone.Because secret is secret.",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: "auto",
    maxAge: 60 * 60 * 60 * 60,
    path: "/",
  },
};
app.use(logger("dev"));
app.use(session(sessionObject));
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: "GET, POST",
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/employee", employeeRouter);
app.use("/staff", staffRouter);
app.use("/", pageRouter);

app.use(express.static(path.join(__dirname, 'login-app')));
app.use(express.static(path.join(__dirname, 'public')));
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

const port = normalizePort(process.env.PORT || "3005");
app.set("port", port);
app.get("*", (req, res) =>
  res.status(200).send({
    message:
      "Sorry, This URL is a private URL. Please change your URL to get benefits.",
  })
);
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
server.listen(port, console.log("server running on " + port));
server.on("error", onError);
server.on("listening", onListening);
