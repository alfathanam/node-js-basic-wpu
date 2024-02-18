// Refactor and hiding complexity

const contacts = require("./contacts");
// const { tulisPertanyaan, simpanData } = require("./contacts"); // you can do this

const mainFunc = async () => {
  const name = await contacts.tulisPertanyaan("Who is your name?\n");
  const email = await contacts.tulisPertanyaan("What is your email?\n");
  const noTelp = await contacts.tulisPertanyaan("What is your number phone?\n");

  contacts.simpanData(name, email, noTelp);
};

mainFunc();

// * Refactor 2
// const pertanyaan2 = () => {
//   return new Promise((resolve, reject) => {
//     rl.question("What is your email?\n", (email) => {
//       resolve(email);
//     });
//   });
// };

// const mainFunc = async () => {
//   const name = await pertanyaan1();
//   const email = await pertanyaan2();

//   const contact = { name, email };
//   // fs.writeFileSync("data/contacts.json", "[]"); // write file [] json

//   const file = fs.readFileSync("data/contacts.json", "utf-8");

//   const contacts = JSON.parse(file); // JSON parse, convert string to json

//   contacts.push(contact);

//   try {
//     //   fs.writeFileSync("data/contacts.json"); //  The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView

//     fs.writeFileSync("data/contacts.json", JSON.stringify(contacts)); // write must string, ensure you make stringyfy cause contacts is json
//   } catch (err) {
//     console.log(err);
//   }

//   console.log("Thank you all field already submitted");
//   // console.log(file);

//   rl.close(); // close terminal
// };
