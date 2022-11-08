const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const colors = require("colors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

/**********************/
/* Import routes here */
/**********************/
const users = require("./routes/users.routes");
const auth = require("./routes/auth.routes");
const initiatives = require("./routes/initiativesRoutes");

/********************************/
// Load env variables.
dotenv.config();

//connect to database
connectDB();

const app = express();

// Server details.
const PORT = process.env.PORT || 4000;
const HOST = "0.0.0.0";
const MODE = process.env.NODE_ENV;

// Morgan logger. Only run Morgan logger during development.
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Helment
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
    },
  })
);

// Backend will receive JSON data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// store token in cookie
app.use(cookieParser());
// CORS add frontend domain name here.
//"http://localhost:3000",
const corsOptions = {
  origin: ["https://roadmapprioritisation.netlify.app"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

/*************************/
/* Mount routers here     */
/*************************/
app.use("/api/v1/users", users);
app.use("/api/v1/auth", auth);
app.use("/api/v1/initiatives", initiatives);
/*************************/
/* Catch all the errors  */
/* from routes           */
/*************************/
app.use(errorHandler);

module.exports = { app, PORT, HOST, MODE };
