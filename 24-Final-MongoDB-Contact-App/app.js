const express = require("express");
const expresslayouts = require("express-ejs-layouts");

const { body, validationResult, check } = require("express-validator");
const methodOverride = require("method-override");

const app = express();
const port = process.env.PORT || 3000;

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
const Contact = require("./models/contacts");

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

// Override middeware
app.use(methodOverride("_method"));

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

// Todo halaman  add contacts, create before contacts/:nama
//* karena jika contacts/:add tidak ada maka akan akses yang contacts/:nama
app.get("/contacts/add", (req, res) => {
  res.render("add-contact", {
    title: "Halaman Add Contact",
    layout: "layouts/main",
  });
});

// Todo Process tambah data with method post

app.post(
  "/contacts",
  [
    body("nama").custom(async (value) => {
      const duplikat = await Contact.findOne({ nama: value });
      if (duplikat) {
        throw new Error("Nama Contact sudah digunakan");
      }
      return true;
    }),
    check("email", "Email tidak valid").isEmail(),
    check("noHp", "no hp tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        title: "Form Tambah Data Contact",
        layout: "layouts/main",
        errors: errors.array(),
      });
    } else {
      Contact.insertMany(req.body, (error, result) => {
        req.flash("msg", "data contact berhasil ditambahkan");
        res.redirect("/contacts");
        // console.log(req.body);
        // res.send(req.body);
      });
    }
  }
);

// Todo Proses Delete contact use method get, because is for lesson not create restFul API
// Todo Change Method HTTP to DELETE Compare with File No : 19
// app.get("/contacts/delete/:nama", async (req, res) => {
//   const contact = await Contact.findOne({ nama: req.params.nama });

//   if (!contact) {
//     res.status(404);
//     res.send("<h1>404</h1>");
//   } else {
//     // res.send("ok");
//     // deleteContact(req.params.nama);
//     Contact.deleteOne({ _id: contact._id }).then((result) => {
//       req.flash("msg", "data contact berhasil dihapus");

//       res.redirect("/contacts");
//     });
//   }
// });

app.delete("/contacts", (req, res) => {
  // res.send(req.body);
  // console.log(req.body);

  Contact.deleteOne({ nama: req.body.nama }).then((result) => {
    req.flash("msg", "data contact berhasil dihapus");

    res.redirect("/contacts");
  });
});

// Todo Create route for Update Contact

app.get("/contacts/update/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });

  res.render("edit-contact", {
    title: "Halaman Edit Contact",
    layout: "layouts/main",
    contact: contact,
  });
});

// Todo Process Update Data
app.put(
  "/contacts",
  [
    body("nama").custom(async (value, { req }) => {
      // access request on module express validator, in checkDUplicate adding some param as an object {req}
      const duplikat = await Contact.findOne({ nama: value });
      if (value !== req.body.oldNama && duplikat) {
        throw new Error("Nama Contact sudah digunakan");

        // same like return false but with message
      }
      return true;
    }),
    check("email", "Email tidak valid").isEmail(),
    check("noHp", "no hp tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit-contact", {
        title: "Form Edit Data Contact",
        layout: "layouts/main",
        errors: errors.array(),
        contact: req.body,
      });
      console.log("Data Salah");
    } else {
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            noHp: req.body.noHp,
          },
        }
      ).then((result) => {
        req.flash("msg", "data contact berhasil diubah");
        res.redirect("/contacts"); // after data dikirim dan maka redirect ke get /contacts
        console.log(req.body);
        // res.send(req.body);
      });
    }
  }
);

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
