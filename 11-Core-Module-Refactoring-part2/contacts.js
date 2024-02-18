const fs = require("fs");
// console.log(fs);

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

  const duplikat = contacts.find((contact) => contact.name === name);
  if (duplikat) {
    console.log(`Nama ${contact.name}  yang anda input sudah terdaftar `);
  }
  return false;

  contacts.push(contact);

  try {
    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts)); // write must string, ensure you make stringyfy cause contacts is json
  } catch (err) {
    console.log(err);
  }

  console.log("Thank you all field already submitted");
  // console.log(file);
};

module.exports = { simpanData };
