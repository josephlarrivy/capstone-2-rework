"use strict";



require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "doNotTell";

const PORT = +process.env.PORT || 3001;


function getDatabaseUri() {
    return (process.env.NODE_ENV === "test")
        ? "mapApplicationDB-testing"
        : process.env.DATABASE_URL || "mapApplicationDB";
}


const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log(" ");
console.log("------------------------");
console.log("APPLICATION CONFIGURATION:".blue);
console.log("SECRET_KEY:".blue, SECRET_KEY);
console.log("Server on port".blue, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".blue, BCRYPT_WORK_FACTOR);
console.log("Database:".blue, getDatabaseUri());
console.log("------------------------");
console.log(" ");

module.exports = {
    SECRET_KEY,
    PORT,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri,
};