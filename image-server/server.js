const express = require("express");
const fs = require("fs");

const app = express();

const port = 8111;

app.get("/public/img/:name", (req, res) => {
  const filePath = __dirname + "/public/img/" + req.params.name;

  fs.readFile(filePath, function (err, content) {
    res.end(content);
  });
});

app.listen(port, () => console.log(`Image server running on port ${port}`));
