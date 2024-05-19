const express = require("express");
const {
  getDataJson,
  findContact,
  addContact,
  checkDuplicate,
  deleteContact,
  updateContacts,
} = require("./utils/contacts"); // automate dibuatkan folder data
const app = express();
const port = 3000;
const bodyparser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");

const { check, validationResult, body } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

//todo  middleware
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));

// todo add middleware URL Encoded, for method post so data not undefined
// app.use(express.urlencoded()); // Deprecreate
app.use(bodyparser.urlencoded({ extended: true }));

//todo Configurasi Flash,session,cookie. Do alert after success insert form
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
    msg: req.flash("msg"),
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
    body("name").custom((value) => {
      const duplikat = checkDuplicate(value);
      if (duplikat) {
        throw new Error("Nama Contact sudah digunakan");
        // same like return false but with message
      }
      return true;
    }),
    check("email", "Email tidak valid").isEmail(),
    check("noTelp", "no hp tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("add-contact", {
        title: "Form Tambah Data Contact",
        layout: "layouts/main",
        errors: errors.array(),
      });
    } else {
      // console.log(req.body);
      // res.send("Data berhasil dikirim");
      addContact(req.body);
      //before redirect to contacts, flash message terlebih dahulu **Additional
      req.flash("msg", "data contact berhasil ditambahkan");

      res.redirect("/contacts"); // after data dikirim dan maka redirect ke get /contacts
    }
    // Playback on 00:30:47 node js 18
  }
);

// Todo Proses Delete contact use method get, because is for lesson not create restFul API
// Todo Jika gunakan method get for delete before route contact/:nama
app.get("/contacts/delete/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  if (!contact) {
    res.status(404);
    res.send("<h1>404</h1>");
  } else {
    // res.send("ok");
    deleteContact(req.params.nama);
    req.flash("msg", "data contact berhasil dihapus");

    res.redirect("/contacts");
  }
});

// Todo Create route for Update Contact

app.get("/contacts/update/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  res.render("edit-contact", {
    title: "Halaman Edit Contact",
    layout: "layouts/main",
    contact: contact,
  });
});

//todo route for proses update data
app.post(
  "/contact/update",
  [
    body("name").custom((value, { req }) => {
      // access request on module express validator, in checkDUplicate adding some param as an object {req}
      const duplikat = checkDuplicate(value);
      if (value !== req.body.oldName && duplikat) {
        throw new Error("Nama Contact sudah digunakan");
        // same like return false but with message
      }
      return true;
    }),
    check("email", "Email tidak valid").isEmail(),
    check("noTelp", "no hp tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    // const contact = findContact(req.params.nama);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("edit-contact", {
        title: "Form Edit Data Contact",
        layout: "layouts/main",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      // res.send(req.body);
      updateContacts(req.body);
      req.flash("msg", "data contact berhasil diubah");
      res.redirect("/contacts"); // after data dikirim dan maka redirect ke get /contacts
    }
    // Playback on 00:30:47 node js 18
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
// todo test
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Hi im back after 18 Express and next upload to github is  19
