// something can u export be modules.
// Object. Function, Class. Variable,

const nama = "Alfathan Aris Munandar";
const umur = 31;

const sayHello = (nama, umur) => {
  return `Hello My Name is ${nama} and my age is ${umur}`;
};

const bioAris = {
  sex: "Male",
  no_hp: 08877673737373,
  cetakBio() {
    return `Jenis kelamin : ${this.sex} and no ${this.no_hp}`;
  },
};
// console.log(bioAris.cetakBio);
/*
 *How to Export module right way :) *

 ! Just Pick One Dont use module export at the same time

 */

//first
// module.exports.sayHello = sayHello(nama, umur);
// module.exports.nama = nama;
// module.exports.umur = umur; // .umur is property
// module.exports.bioAris = bioAris;

//second
// module.exports = {
//   bioAris: bioAris,
//   nama: nama,
//   umur: umur,
//   sayHello: sayHello(nama, umur),
// };

module.exports = {
  bioAris: bioAris,
  nama,
  umur,
  sayHello: sayHello,
};
// if any parameter, it must to fill the param
