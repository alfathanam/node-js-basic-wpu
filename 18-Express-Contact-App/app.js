const express = require("express");
const { getDataJson, findContact } = require("./utils/contacts"); // automate dibuatkan folder data
const app = express();
const port = 3000;

const expressLayouts = require("express-ejs-layouts");

//todo  middleware
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));

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

// Todo using getContactJson on this route

app.get("/contacts", (req, res) => {
  const contacts = getDataJson();
  // console.log(contacts);
  res.render("contacts", {
    title: "Halaman Contacts",
    layout: "layouts/main",
    contacts,
  });
});

// Todo detailContact and create new Route

app.get("/details/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.render("details", {
    title: "Halaman Details Contact",
    layout: "layouts/main",
    contact,
  });
});

app.get("/abouts", (req, res) => {
  res.render("abouts", { title: "Halaman Abouts", layout: "layouts/main" });
  // next();
});

app.use("/", (req, res) => {
  res.send("Default, always dijalankan");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
