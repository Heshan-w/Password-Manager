const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const {encrypt, decrypt} = require('./EncryptionHandler')

const PORT = 3001;

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "PasswordManagerDB",
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

// The endpoint to test the server
app.get("/", (req, res) => {
  res.send("hello word!!");
});

// The endpoint to add a password to the database
app.post("/addpassword", (req, res) => {
  const { password, title } = req.body;
  const encryptedPassword = encrypt(password);
  db.query(
    "INSERT INTO passwords (password, title, iv) VALUES(?, ?, ?)",
    [encryptedPassword.password, title, encryptedPassword.iv],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Success");
      }
    }
  );
});


app.get("/showpassword", (req, res) => {
  db.query("SELECT * FROM passwords;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.post("/getpassword", (req, res) => {
  res.send(decrypt(req.body));
})