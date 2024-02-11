// Node Modules
/**
 * 1 . Modules core -> Module yang existing sudah ada ketika node di install
 * 2. Modules local -> Module yang dibuat sendiri like before we create on repo introduction
 * 3. Third Party Modules -> NPM install its third
 */

// const fs = require("fs"); // Core module, FS-> file System
// const contoh = require("./path"); //Local Module -> path ./ in one folde if ahead folder can use ./../ etc
// const moment = require("moment"); // Third party -> if you need more modules and fast u can install and check documentation anything need install

const coba1 = require("./2_node_module_example");
console.log(coba1.nama);

console.log(coba1.sayHello("aris", 21));

console.log(coba1.bioAris.cetakBio());
