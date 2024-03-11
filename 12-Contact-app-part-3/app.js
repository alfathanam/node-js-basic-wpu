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
yargs.command({
  command: "list",
  describe: "tampilkan semua nama & ho HP",
  handler() {
    contacts.getContactList();
  },
});

//Todo Menampilkan detail dari contact yang dipilih based on name
yargs.command({
  command: "details",
  describe: "menampilkan name, email, no Hp",
  builder: {
    name: {
      describe: "nama",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detailsContact(argv.name);
  },
});

yargs.parse();
