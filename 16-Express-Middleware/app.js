const express = require("express");
const app = express();
const port = 3000;

const expressLayouts = require("express-ejs-layouts");

//third party middleware
const morgan = require("morgan");

//todo Using EJS
app.set("view engine", "ejs");

// * Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next. Documentation https://expressjs.com/en/guide/using-middleware.html#using-middleware

//Todo middleware type : Application-level-middleware ,Router-level-middleware, Error-handling-middleware, Built-in-middleware, Thirdparty-middleware

//todo  3 third party middleware
app.use(expressLayouts); // example of middle ware
app.use(morgan("dev"));

// Todo 2 Built-in Middleware

app.use(express.static("public", { dotfile: "ignore" })); //Example 1 built-in middleware, ini agar file static yang ada direpo ini bisa diakses. Seperti html file, img, css dll

// todo 1 application middleware
app.use((req, res, next) => {
  // res.send(`${Date.now()}`);
  console.log("time", Date.now());
  next(); // if not invoke next will hanging
});

app.use((req, res, next) => {
  // res.send(`${Date.now()}`);
  console.log("Ini middleware 2");
  next(); // if not invoke next will hanging

  // ! after next dijalankan akan mencari middleware selanjutnya jika tidak ada akan menajlankan root /
});

// todo default on method GET tidak perlu menggunakan middleware
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
  // next();
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
