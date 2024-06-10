/* eslint-disable no-undef */
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const swagger = require('./swagger')

require("dotenv").config();

const UserRouter = require("./routes/userRouts");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

mongoose
  .connect(process.env.FlavorFusionUrl)
  .then(() => {
    console.log("connected to database");
  })

  .catch((err) => {
    console.log("connection error for  database", err);
  });
app.use("/", UserRouter);

swagger(app)
/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message
 *     responses:
 *       200:
 *         description: Returns a hello message
 */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
