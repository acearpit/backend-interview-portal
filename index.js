const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { json } = require("body-parser");
const dotenv = require("dotenv");

const routes = require("./Routes/Routes.js");

const app = express();

dotenv.config();
app.use(cors());
app.use(json());

app.get("/", (_, res, __) => res.send("Hello! this is the backend for interview creation portal"));
app.use(routes);

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@nodejs-project.rr5qv.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("DB connection successfull!");
    });
  })
  .catch(() => {
    console.log("Error in establishing DB connection!");
  });
