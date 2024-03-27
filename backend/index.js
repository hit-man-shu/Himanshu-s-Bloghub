const express = require("express");
const jsonServer = require("json-server");
const cors = require("cors");

const app = express();
const router = jsonServer.router("db.json");

// Enable CORS for all origins (consider more specific configuration in production)
app.use(cors());

app.use(router);
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
