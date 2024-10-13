const crypto = require("crypto");

const algoritmo = "aes-256-cbc";
//const key = "myTotallySecretKey";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16); // valor inicial / valor de complejidad

const encriptar = (password) => {
    const cipher = crypto.createCipheriv(algoritmo, key, iv) // obj de encriptacion
    const passwordEncripted = Buffer.concat([cipher.update(password), cipher.final()]);

    return {
        iv: iv.toString("hex"),
        encripted: passwordEncripted.toString("hex")
    }
}

const desencriptar = (password) => {
    const iv = Buffer.from(password.iv, "hex");
    const encripted = Buffer.from(password.encripted, "hex");

    const passwordDesencripted = crypto.createDecipheriv(algoritmo, key, iv);

    return Buffer.concat([passwordDesencripted.update(encripted), passwordDesencripted.final()]).toString();
}

module.exports = {
    encriptar,
    desencriptar
}