const nano = require('nano');
const Cryptr = require("cryptr");
const jwt = require("jsonwebtoken");
const jwt_utils = require("../utils/jwt.utils");

const Usuario = require("../models/Usuario");

const user = 'admin';
const password = 'admin';

// Conexión a CouchDB con autenticación
const couchdb = nano(`http://${user}:${password}@127.0.0.1:5984`); 
const dbWithAuth_user = couchdb.db.use('usuarios');

// Con esto realizamos el hash
const cryptr = new Cryptr('myTotallySecretKey');

const loginUsuario = async (req, res) => {
    const data = req.body;
    const data_email = data.email;
    const data_password = data.password;

    try {
        const user_res = await dbWithAuth_user.find({
            selector: {
                email: data_email,
            },
            fields: ["_id", "email", "password"]
        });

        if (user_res.docs && user_res.docs.length >= 1) 
        {
            const pd = await cryptr.decrypt(user_res.docs[0].password);
            const user_id = user_res.docs[0]._id;

            if (data_password == pd && user_id) 
            {
                const token = await jwt.sign(
                    { id: user_id },
                    "myTotallySecretKey", 
                    { expiresIn: "2h" }
                );

                return res.json({token: token});
            }
            else
            {
                return res.send({ error: "Contraseña incorrecta" });
            }

        }
        else
        {
            res.send({ error: "Error al ingresar el email" });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const crearUsuario = async (req, res) => {
    const data = req.body;
    //const idUsuario = `usuario:${data.email}`;

    const pd_encrypted = cryptr.encrypt(data.password);

    const nuevoUsuario = new Usuario(
        data.nombre,
        data.apellidos,
        data.email,
        pd_encrypted
    );

    try {
        const usuarioExistente = await dbWithAuth_user.find({
            selector: {
                email: data.email
            },
            fields: ["email", "password"]
        });
        
        if (!usuarioExistente.docs.length >= 1)
        {
            await dbWithAuth_user.insert(nuevoUsuario).then((user)=>{

                return res.status(201).json(user);
            });
        }
        else
        {
            return res.status(409).json({ error: "El usuario ya existe" });
        }


    } catch (error) {
        
        res.status(400).json({ error: error.message });
    }
};

const leerUsuarios = async (req, res) => {
    try {
        const usuarios = await dbWithAuth_user.list({ include_docs: true });
        res.json(usuarios.rows.map(row => row.doc));

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const leerUsuario = async (req, res) => {

    const userid = req.token_usuarioId;

    try {
        const usuario = await dbWithAuth_user.get(userid);
        res.json(usuario);
        
    } catch (error) {
        if (error.statusCode === 404) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(500).json({ error: error.message });
    }
};

const actualizarUsuario = async (req, res) => {
    const userid = req.token_usuarioId;

    try {
        const usuarioExistente = await dbWithAuth_user.get(userid);
        const usuarioActualizada = { ...usuarioExistente, ...req.body };

        await dbWithAuth_user.insert(usuarioActualizada);
        res.json(usuarioActualizada);
    } catch (error) {
        if (error.statusCode === 404) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(400).json({ error: error.message });
    }
};

const borrarUsuario = async (req, res) => {
    const userid = req.token_usuarioId;

    try {
        const usuario = await dbWithAuth_user.get(userid);
        await dbWithAuth_user.destroy(usuario._id, usuario._rev);
        res.json({ message: 'Usuario eliminado' });

    } catch (error) {
        if (error.statusCode === 404) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(500).json({ error: error.message });
        
    }
};

module.exports = {
    loginUsuario,
    crearUsuario,
    leerUsuarios,
    leerUsuario,
    actualizarUsuario,
    borrarUsuario
};
