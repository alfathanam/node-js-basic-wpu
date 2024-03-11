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

//Todo asbraksi readFile data from data.json, karena akan dipakai berulang

const getDataJson = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

const simpanData = (name, email, noTelp) => {
  const contact = { name, email, noTelp };

  const contacts = getDataJson();

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

// Todo create method getContactList
const getContactList = () => {
  const contacts = getDataJson();
  console.log(chalk.cyan.inverse.bold`----List contact name & No HP----\n`);
  contacts.forEach(({ name, noTelp }, i) => {
    return console.log(`${i + 1}. ${name} -- ${noTelp}`);
  });
};
// getContactList();

//Todo create method for detailsContact
const detailsContact = (name) => {
  const contacts = getDataJson();
  const contact = contacts.find((nm) => {
    return name.toLowerCase() === nm.name.toLowerCase();
  });
  // console.log(contact);
  if (!contact) {
    console.log(
      chalk.red.inverse.bold` ${name} yang anda cari tidak ada dalam list`
    );
    return false;
  }
  if (contact) {
    console.log(
      chalk.red.inverse
        .greenBright` name on database : ${name} yang anda cari ada dalam list`
    );

    console.log(contact.name);
    console.log(contact.noTelp);
    if (contact.email) {
      console.log(contact.email);
    } else {
      console.log("email it is not fill");
    }

    return true;
  }
};
// detailsContact("aris123");

// Todo create method removeData

const removeData = (name) => {
  const contacts = getDataJson();
  const newContacts = contacts.filter((dtName) => {
    return dtName.name.toLowerCase() !== name.toLowerCase();
  });
  // console.log(newContacts);
  if (contacts.length === newContacts.length) {
    console.log(
      chalk.red.inverse.bold` data : ${name} yang anda cari tidak ditemukan`
    );
  } else {
    try {
      fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts)); // Rewrite to newContacts
    } catch (err) {
      return console.log(err);
    }
    console.log(
      chalk.green.inverse.bold(`Thank you, data ${name} already deleted `)
    );
  }
};
// removeData("tesssss");

module.exports = { simpanData, getContactList, detailsContact, removeData };
