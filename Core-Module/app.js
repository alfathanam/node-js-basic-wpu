// core module
// Learn some core module existing on node
//Example, Write,read on sync or async

const fs = require("fs");
// console.log(fs);

// * How to write string to file on (syncronous)

fs.writeFileSync("test.txt", "Hallo Alfathan aris"); // jika file blm ada akan dibuatkan, jika sudah ada akan ditimpa

//syncrounous for catch error use try catch , if async use with callback
// try {
//   fs.writeFileSync("data/test.txt", "Hello aris"); // jika folder yang blm ada maka akan error, tidak bisa dengan core modue berikut
// } catch (e) {
//   console.log(e);
// }
// fs.writeFileSync("aris/test.txt", "Hello aris 2"); // error without try catch

// * How to write string to file on (asyncronous)
// fs.writeFile(
//   "data/test-async.txt",
//   "Hallo world file created in a way async",
//   (error) => {
//     console.log(error);
//   }
// );

// * How to read file on (syncrnous)
// const data = fs.readFileSync("data/test.txt", "utf-8");
// console.log(data);

// * How to read file on (asyncrnous)
// const dataAysnc = fs.readFile("data/test-async.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// * How to reading data from terminal log,
//! READ DOCS

const readline = require("readline");
const { json } = require("stream/consumers");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Who is your name?\n", (name) => {
//   rl.question("how is your age?", (age) => {
//     //TODO answer the name on log
//     console.log(`your age is ${age}`);
//     console.log(`Hello ${name} you're so handsome`);
//     rl.close();
//   });
// });

// ? Challenge how create json file base on input on terminal

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Who is your name?\n", (name) => {
  rl.question("What is your phone number?\n", (phone) => {
    // console.log(`Your name, ${name}, and your phone ${phone}`);  // debug to console

    const contact = {
      name: name,
      phone: phone,
      // Cuma name jg bisa
    };
    // fs.writeFileSync("data/contacts.json", "[]"); // write file [] json

    const file = fs.readFileSync("data/contacts.json", "utf-8");

    const contacts = JSON.parse(file); // JSON parse, convert string to json

    contacts.push(contact);

    try {
      //   fs.writeFileSync("data/contacts.json"); //  The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView

      fs.writeFileSync("data/contacts.json", JSON.stringify(contacts)); // write must string, ensure you make stringyfy cause contacts is json
    } catch (err) {
      console.log(err);
    }

    console.log("Thank you all field already submitted");
    // console.log(file);

    rl.close(); // close terminal
  });
});
