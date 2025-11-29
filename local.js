const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");

app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Localhost has started on http://localhost:${PORT}/`);
});
