//encrypt-decrypt messages
const crypto = require('crypto');
const algorithm = process.env.ENCRYPTEDDATA_ALGO;
let key = process.env.ENCRYPTEDDATA_KEY;

module.exports = {
    api_secret_key: process.env.API_SECRET_KEY,
   
    encrypt: (text) => {
        let cipher = crypto.createCipher(algorithm,key);
        let crypted = cipher.update(text,'utf8','hex');
        crypted += cipher.final('hex');
        return crypted;
    },
    decrypt: (text) => {
        let decipher = crypto.createDecipher(algorithm,key);
        let dec = decipher.update(text,'hex','utf8');
        dec += decipher.final('utf8');
        return dec;
    }
};

