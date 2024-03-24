const express = require("express");
const { getDataJson, findContact, addContact } = require("./utils/contacts"); // automate dibuatkan folder data
const app = express();
const port = 3000;
const bodyparser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");

const { check, validationResult, body } = require("express-validator");

//todo  middleware
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));

// todo add middleware URL Encoded, for method post so data not undefined
// app.use(express.urlencoded()); // Deprecreate
app.use(bodyparser.urlencoded({ extended: true }));

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

// Todo halaman  add contacts, create before contacts/:nama
//* karena jika contacts/:add tidak ada maka akan akses yang contacts/:nama
app.get("/contacts/add", (req, res) => {
  res.render("add-contact", {
    title: "Halaman Add Contact",
    layout: "layouts/main",
  });
});

// Todo Form data with method post

app.post(
  "/contacts",
  [
    check("email", "Email tidak valid").isEmail(),
    body("noTelp").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // console.log(req.body);
    // res.send("Data berhasil dikirim");
    // addContact(req.body);
    // res.redirect("/contacts"); // after data dikirim dan maka redirect ke get /contacts
    //and show data contacts
  }
);

// Todo detailContact and create new Route

app.get("/contacts/:nama", (req, res) => {
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
