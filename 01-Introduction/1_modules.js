let nama = "alfathan";
let umur = 31;

// we will export this module, so this module can use on another modules
const sayHello = (nama, umur) => {
  return `Nama saya ${nama}, dan umur saya sekarang ${umur} `;
};

module.exports = sayHello(nama, umur);
