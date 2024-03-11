const contacts = require("./contacts");
const yargs = require("yargs");
yargs
  .command({
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
      contacts.simpanData(argv.name, argv.email, argv.noHp);
    },
  })
  .demandCommand();

// Todo Menampilkan daftar semua nama & no Hp

yargs.parse();
