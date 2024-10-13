const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next){

    const token = await req.headers['authorization']

    if(!token){
        return res.status(403).send("No existe un token");
    }
    else
    {
        const decoded = await jwt.verify(token, "myTotallySecretKey");

        req.token_usuarioId = decoded.id;
        next();

    }

}

module.exports = verifyToken;