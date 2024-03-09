const express = require("express");
const app = express();
const mysql = require("mysql");
const PORT = 3001;

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "PasswordManagerDB",
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

app.post("/addpassword", (req, res) => {
  const { password, title } = req.body;
  db.query(
    "INSERT INTO passwords (password, title) VALUES(?, ?)",
    [password, title],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Success");
      }
    }
  );
});

app.get("/", (req, res) => {
  res.send("hello word!!!");
});
