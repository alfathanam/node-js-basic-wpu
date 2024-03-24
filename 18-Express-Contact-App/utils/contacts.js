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
// console.log(findContact("aris"));

module.exports = { getDataJson, findContact };
