const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

// var data = {
//   id: 10
// };

// var token = jwt.sign(data, '123adb');
// console.log(token);

// var decoded = jwt.verify(token, '123adb');
// console.log('decoded', decoded);


// var message = 'I am user number 4';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//   id: 4
// };
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// if (resultHash === token.hash) {
//   console.log('Data was not changed')
// } else {
//   console.log('Data was changed. Do not trust.')
// } 


const bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   })
// })

// kako pa to sedaj uporabim, da preverim geslo
var hashedPassword = '$2a$10$iWivWgQoBPWyxGJ7pOrd8eJRbzxfylpMcSXWag/dRlI4bWr73vwo2';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
})
