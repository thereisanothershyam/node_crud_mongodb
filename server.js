const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const route = require("./routes/app_route");
const connectDB = require("./config/db");
const colors = require("colors");
const errorHandler = require("./middleware/error");

//Load env variables
dotenv.config({ path: "./config/config.env" });

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// connect to database
connectDB();

// Route files
app.use("/api/v1/poc", route);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server is ruuning in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
