const fs = require("fs");
// console.log(fs);

const chalk = require("chalk"); // use npm chalk to install this module

const validator = require("validator");
//* Checking file / directory exist.
const dirPath = "./data"; // Membuat Folder Data
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const simpanData = (name, email, noTelp) => {
  const contact = { name, email, noTelp };

  const file = fs.readFileSync("data/contacts.json", "utf-8");

  const contacts = JSON.parse(file); // JSON parse, convert string to json

  //check name duplikat
  const duplikat = contacts.find((contact) => contact.name === name);

  if (duplikat) {
    console.log(
      chalk.red.inverse.bold`${contact.name}  yang anda input sudah terdaftar `
    );
    return false;
  }

  //check if email is formatted, in here we use npm validator

  if (email) {
    if (!validator.isEmail(email)) {
      console.log(
        chalk.red.inverse
          .bold` email yang anda input tidak valid, Mohon Periksa Kembali`
      );
      return false;
    }
  }
  if (noTelp) {
    if (!validator.isMobilePhone(noTelp, "id-ID")) {
      console.log(
        chalk.red.inverse
          .bold` No telfon yang anda input tidak valid, Mohon Periksa Id No anda`
      );
      return false;
    }
  }

  contacts.push(contact);

  try {
    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts)); // write must string, ensure you make stringyfy cause contacts is json
  } catch (err) {
    console.log(err);
  }

  console.log(
    chalk.green.inverse.bold("Thank you, all field already submitted")
  );
  // console.log(file);
};

module.exports = { simpanData };
