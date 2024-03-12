const express = require("express");
const app = express();
const port = 3000;
const expressLayouts = require("express-ejs-layouts");
//todo Using EJS
app.set("view engine", "ejs");
app.use(expressLayouts);

// Renders a view and sends the rendered HTML string to the client. Optional parameters:
// locals, an object whose properties define local variables for the view.
// callback, a callback function. If provided, the method returns both the possible error and rendered string, but does not perform an automated response. When an error occurs, the method invokes next(err) internally.
app.get("/", (req, res) => {
  const mhs = [
    {
      nama: "alfathan",
      email: "alfathan@gmail.com",
      noHp: "08782372323",
    },
    {
      nama: "aris",
      email: "aris@gmail.com",
      noHp: "08782372323",
    },
    {
      nama: "munandar",
      email: "munandar@gmail.com",
      noHp: "08782372323",
    },
  ];
  res.render("index", {
    nama: "Aris",
    title: "Belajar EJS",
    mahasiswa: mhs,
    layout: "layouts/main",
  });
  //* sent data nama to index.ejs not
});
app.get("/contacts", (req, res) => {
  res.render("contacts", { title: "Halaman Contacts", layout: "layouts/main" });
});
app.get("/abouts", (req, res) => {
  res.render("abouts", { title: "Halaman Abouts", layout: "layouts/main" });
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
