const express = require("express");
const app = express();
const port = 3000;

//todo Using EJS
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // res.sendFile("./index.html", { root: __dirname });
  res.render("index");
});
app.get("/contacts", (req, res) => {
  res.render("contacts");
});
app.get("/abouts", (req, res) => {
  res.render("abouts");
});

app.get("/products/:id/category/:idCat", (req, res) => {
  res.send(`this product ${req.params.id} <br> 
  this category is ${req.params.idCat} <br>
  this color is ${req.query.color}`); //*id from products/:id
  //   http://localhost:3000/products/1/category/shoes?color=red
});

app.use("/", (req, res) => {
  res.send("Default, always dijalankan");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
