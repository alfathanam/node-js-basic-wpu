// Node => use modoule system, like one file dianggap sebagai module
// Memungkinkan menjalan kan 2 module dalam 1 file Ex :

const sum = require("./1_another_module");

const sayHello = require("./1_modules");

console.log(sayHello);
console.log(sum);
