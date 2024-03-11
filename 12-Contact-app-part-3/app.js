// * Adjust and use another way to create contact app
// * this is part 2, so let code

// console.log(process.argv[2]); //Process is  build existing on node and call without call cause not function
const contacts = require("./contacts");
const yargs = require("yargs");
yargs.command({
  command: "add",
  describe: "menambahkan contact baru",
  builder: {
    name: {
      describe: "nama lengkap",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "email user",
      demandOption: false,
      type: "string",
    },
    noHp: {
      describe: "number phone",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    // const contact = {
    //   name: argv.name,
    //   email: argv.email,
    //   noHp: argv.noHp,
    // };
    // console.log(contact);

    contacts.simpanData(argv.name, argv.email, argv.noHp);
  },
});

yargs.parse();
