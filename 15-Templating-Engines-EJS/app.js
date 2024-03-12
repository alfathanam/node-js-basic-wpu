const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile("./index.html", { root: __dirname }); // *todo like before, sendFile html,pdf,image,css
});
app.get("/contacts", (req, res) => {
  res.sendFile("./contacts.html", { root: __dirname });
});
app.get("/abouts", (req, res) => {
  res.sendFile("./abouts.html", { root: __dirname });
});

//todo Learn about req.params, and req.query

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
