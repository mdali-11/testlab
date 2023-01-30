const bcrypt = require("bcrypt");

async function passBcrypt(pass) {
  let data = await bcrypt.hash(pass, 12);
  return data;
}
module.exports = passBcrypt;
