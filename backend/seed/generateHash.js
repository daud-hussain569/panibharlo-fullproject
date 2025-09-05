import bcrypt from "bcryptjs";

const password = "john55667"; // the password you want
const salt = bcrypt.genSaltSync(12); // same as your pre('save') hook
const hash = bcrypt.hashSync(password, salt);

console.log("Hashed password:", hash);
