const fs = require("fs");
// console.log(fs);

const readline = require("readline"); // core module terminal interface

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//* Checking file / directory exist.
const dirPath = "./data"; // Membuat Folder Data
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const tulisPertanyaan = (pertanyaan) => {
  return new Promise((resolve, reject) => {
    rl.question(pertanyaan, (cb) => {
      resolve(cb);
    });
  });
};

//! Refactor function Simpandata, because this block program can save to another func

const simpanData = (name, email, noTelp) => {
  const contact = { name, email, noTelp };

  const file = fs.readFileSync("data/contacts.json", "utf-8");

  const contacts = JSON.parse(file); // JSON parse, convert string to json

  contacts.push(contact);

  try {
    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts)); // write must string, ensure you make stringyfy cause contacts is json
  } catch (err) {
    console.log(err);
  }

  console.log("Thank you all field already submitted");
  // console.log(file);

  rl.close(); // close terminal
};

module.exports = { tulisPertanyaan, simpanData };

const aris = 12;

let test = 10;
asdasdasdasasdasdasdasdasdasdasdasdasdasdas