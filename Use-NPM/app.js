/*
? How to use npm modulue, its same when use core modules. 
* Example Validator -> package for validator some numeric,mobilphone, and etc checkout on documentation NPM
* Example Chalk->  for customize terminal, that for learn how to use NPM 
* Nodemon -> for node monitoring, it helpful for changes on dev
? for nodemon install on global, npm i -g nodemon
? and install on local npm i --save--dev nodemon and configure on script 

*/

const validator = require("validator");
const chalk = require("chalk");
// import chalk from "chalk";

/*
 *------Validator-------------
 */

// console.log(validator.isEmail("test@gmail.com")); //validator email

// console.log(validator.isNumeric("1234a")); //validator numeric

// console.log(validator.isMobilePhone("08082092211111", "id-ID")); // Mobile phone validator

/*
 *------Chalk-------------
 */

console.log(chalk.blue("hello world"));
console.log(chalk.black.bgYellow("hello world"));
console.log(chalk.bold("hello world"));
console.log(chalk.bold("hello aris"));
