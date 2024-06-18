const express = require("express");
const expresslayouts = require("express-ejs-layouts");
const app = express();
const port = 3000;

//todo require contact and require connection from db
require("./utils/db");
const Contacts = require("./models/contacts");

//todo require ejs layout
const expressLayouts = require("express-ejs-layouts");

const bodyparser = require("body-parser");

//todo cookie parser, session connect-flash
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

//todo  middleware
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

//todo Home Page
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

//todo About page

app.get("/abouts", (req, res) => {
  res.render("abouts", { title: "Halaman Abouts", layout: "layouts/main" });
  // next();
});

//todo Contact Page, Here Adjustment Contact Data From Database Not Json Again
//todo because Contacs.find() result is Promise we need then or async

app.get("/contacts", async (req, res) => {
  const contacts = await Contacts.find();
  // console.log(contacts);
  res.render("contacts", {
    title: "Halaman Contacts",
    layout: "layouts/main",
    contacts,
    msg: req.flash("msg"),
  });
});

// Todo detailContact and create new Route

app.get("/contacts/:nama", async (req, res) => {
  const contact = await Contacts.findOne({ nama: req.params.nama });
  res.render("details", {
    title: "Halaman Details Contact",
    layout: "layouts/main",
    contact,
  });
});

app.listen(port, () => {
  console.log(
    `Mongo DB Contact App | Listening on port http://localhost:${port}`
  );
});
