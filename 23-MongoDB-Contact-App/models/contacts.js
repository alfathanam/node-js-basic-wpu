const mongoose = require("mongoose");

// todo Membuat Schema / Seperti ORM pada Postgree or mysql
// * with mongoose lebih memudahkan

// contact, in mongoose automatic with plural naming to contacts
const Contact = mongoose.model("Contact", {
  nama: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  noHp: {
    type: String,
    required: true,
  },
});

module.exports = Contact;
