// * Express JS
// * Web App Framework, Providing Interface for development web, helping managing data stream
// * MERN, MEVN, MEAN Mongo,express,react,node

//? Feature on express JS
//* 1. Handling request dengan method http dengan mudah (routes)
//* 2. MVC -> model view controller
//* 3. MiddleWare
//* 4. terintegrasi dengan view rendering engine, template managing

// Todo do like materi 13 but using express

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  // * Check Documentation res,req , app
  //   res.send("Hello World!");
  //   res.sendStatus(200);
  //   res.json({
  //     name: "alfathan",
  //     email: "aris@gmail.com",
  //     noHp: "08766666121",
  //   });

  res.sendFile("./index.html", { root: __dirname }); // *todo like before, sendFile html
});
app.get("/contacts", (req, res) => {
  res.sendFile("./contacts.html", { root: __dirname });
});
app.get("/abouts", (req, res) => {
  res.sendFile("./abouts.html", { root: __dirname });
});

//*  app use
//* Mounts the specified middleware function or functions at the specified path: the middleware function is executed when the base of the requested path matches path.

app.use("/", (req, res) => {
  res.send("Default, always dijalankan");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
