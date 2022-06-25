const express = require('express');
const cors = require('cors');
const connection = require('./dbConnection');
const bodyParser = require('body-parser');

const crypto = require('crypto');
const key = "password";
const algo = "aes256";

const jwt = require('jsonwebtoken');
const jwtKey = "jwt";

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

  app.get("/products", (req, res) => {
    connection.query("SELECT * FROM products", (err, result) => {
      err ? res.send("There is some error in API") : res.send(result);
    });
  });


  app.post("/signUp", (req, res) => {
    const data = req.body;
    const cipher = crypto.createCipher(algo, key);
    const encrypted = cipher.update(req.body.password, 'utf8', 'hex') + cipher.final('hex');


    const updatedData = {
      ...data,
      password: encrypted,
    }

    connection.query("INSERT INTO signup SET ?", updatedData, (err, result) => {
      if(err)
        res.send("Error in signup Post API");
      else{
        res.send("User Registered Successfully!");
        // res.json(result);
        jwt.sign(result, jwtKey, {expiresIn:'300s'},(err,token)=>{
          res.json(token);
        })
      }
    })
  });


  app.get("/login", (req, res) => {
    // const email = req.body.email;
    // const password = req.body.password;
    // const email="tannu@gmail.com";
    // const password="abc@12345";

    connection.query(`SELECT * FROM signup WHERE email = "tannu@gmail.com " AND password = "abc@12345"`, (err, result) => {
      if(err)
        res.send("Error in login Post API");
      else
        res.send(result);
    })
  });

  // app.post("/cart", (req, res) => {
  //   // const data = req.body;
  //   connection.query("INSERT INTO cart SET ?", data, (err, result) => {
  //     if(err)
  //       res.send("Error in cart Post API");
  //     else
  //         res.send(result);
  //   })
  // });

  app.listen(3001);


















//   const express = require('express');
// var cors = require('cors');
// var connection = require('./dbConnection');
// const bodyParser = require('body-parser');
// const app = express();

// app.use(cors());

// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

//   app.get("/products", (req, res) => {
//     connection.query("SELECT * FROM products", (err, result) => {
//       err ? res.send("There is some error in API") : res.send(result);
//     });
//   });


//   app.post("/signUp", (req, res) => {
//     const data = req.body;
//     connection.query("INSERT INTO signup SET ?", data, (err, result) => {
//       if(err)
//         res.send("Error in signup Post API");
//       else
//          res.send("User Registered Successfully!");
//     })
//   });


//   app.get("/login", (req, res) => {
//     // const email = req.body.email;
//     // const password = req.body.password;
//     // const email="tannu@gmail.com";
//     // const password="abc@12345";

//     connection.query(`SELECT * FROM signup WHERE email = "tannu@gmail.com " AND password = "abc@12345"`, (err, result) => {
//       if(err)
//         res.send("Error in login Post API");
//       else
//         res.send(result);
//     })
//   });

//   // app.post("/cart", (req, res) => {
//   //   // const data = req.body;
//   //   connection.query("INSERT INTO cart SET ?", data, (err, result) => {
//   //     if(err)
//   //       res.send("Error in cart Post API");
//   //     else
//   //         res.send(result);
//   //   })
//   // });

//   app.listen(3000);
