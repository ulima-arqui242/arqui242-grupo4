const jwt = require("jsonwebtoken");

function generateToken(userId) {
    // Al generar el token, incluimos el `id` como parte del payload
    const token = jwt.sign(
        { id: userId }, // Incluir el `userId` en el payload
        "myTotallySecretKey", 
        { expiresIn: "2h" } // Tiempo de expiración del token
    );
    return token;
}

module.exports = generateToken;