const express = require("express");
const jsonServer = require("json-server");
const cors = require("cors");

const app = express();
const router = jsonServer.router("db.json");

// Enable CORS for all origins (consider specific configuration in production)
app.use(cors());

const port = process.env.PORT || 8080; // Default to 8080 if PORT is not set

app.use(router);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
