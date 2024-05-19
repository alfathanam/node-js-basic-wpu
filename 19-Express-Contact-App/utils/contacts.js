const fs = require("fs");
// console.log(fs);

//* Checking file / directory exist.
const dirPath = "./data"; // Membuat Folder Data
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}
//* Membuat file contacts jika belum ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

//* asbraksi readFile data from data.json, karena akan dipakai berulang
const getDataJson = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

// todo create function findContact for details contact page
const findContact = (name) => {
  const contacts = getDataJson();
  // console.log(contact);
  const contact = contacts.find((contact) => {
    return contact.name == name;
  });
  return contact;
};

// todo  Menampilkan data contacts / dan menimpa File contacs.json
const saveContacts = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts)); // menimpa
};
// todo menambahkan contact baru
const addContact = (contact) => {
  const contacts = getDataJson();
  contacts.push(contact); // Contacts array of object
  saveContacts(contacts);
};

//todo Check Nama Duplicate

const checkDuplicate = (nama) => {
  const contacts = getDataJson();
  return contacts.find((contact) => contact.name === nama);
};
// console.log(checkDuplicate("aris"));

//Todo Create Method for delete contact and export and import this module to app.js

const deleteContact = (nama) => {
  const contacs = getDataJson();
  const filteredContact = contacs.filter((contact) => {
    return contact.name !== nama;
  });
  // console.log(nama);
  // console.log(filteredContact);
  saveContacts(filteredContact);
};

module.exports = {
  getDataJson,
  findContact,
  addContact,
  checkDuplicate,
  deleteContact,
};
