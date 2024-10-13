require("../models/Reserva");

const nano = require('nano');
const Reserva = require("../models/Reserva");

const user = 'admin';
const password = 'admin';

// Conexión a CouchDB con autenticación
const couchdb = nano(`http://${user}:${password}@127.0.0.1:5984`); 
const dbWithAuth_reservas = couchdb.db.use('reservas');
const dbWithAuth_users = couchdb.db.use('usuarios');

// Crear nueva reserva
const crearReserva = async (req, res) => {
    
    const nuevaReserva = new Reserva(
        req.body.fecha_reserva || new Date().toISOString(),
        req.body.estado,
        req.token_usuarioId,
        req.body.detalles
    );

    try {
        await dbWithAuth_reservas.insert(nuevaReserva);
        res.status(201).json(nuevaReserva);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const leerReservasPorUsuario = async (req, res) => {
    const userId = req.token_usuarioId;

    try {
        const reservas = await dbWithAuth_reservas.find({
            selector: { id_usuario: userId }
        });

        if (reservas.docs.length === 0) {
            return res.status(404).json({ message: 'No se encontraron reservas para este usuario' });
        }

        res.json(reservas.docs);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const leerReservas = async (req, res) => {
    const res_id = req.params.id
    const userId = req.token_usuarioId;

    try {
        const reservas = await dbWithAuth_reservas.list({ include_docs: true });
        
        const reservasConUsuarios = await Promise.all(reservas.rows.map(async (row) => {
            const reserva = row.doc;

            const idUsuario = reserva.id_usuario;

            try {
                const usuario = await dbWithAuth_users.get(idUsuario);
                reserva.usuario = usuario;

            } catch (error) {

                reserva.usuario = { error: 'Usuario no encontrado' };
            }

            return reserva;
        }));

        // Enviar la lista de reservas con detalles de usuario
        res.json(reservasConUsuarios);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Leer una reserva por id
const leerReservaPorId = async (req, res) => {
    const res_id = req.params.id

    try {
        const reserva = await dbWithAuth_reservas.get(res_id);

        const idUsuario = reserva.id_usuario;

        try {
            const usuario = await dbWithAuth_users.get(idUsuario);
            reserva.usuario = usuario;

        } catch (error) {
            reserva.usuario = { error: 'Usuario no encontrado' };
        }
        
        res.json(reserva);

    } catch (error) {
        if (error.statusCode === 404) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una reserva
const actualizarReserva = async (req, res) => {
    const userid = req.token_usuarioId;

    try {
        const reservaExistente = await dbWithAuth_reservas.get(userid);
        const reservaActualizada = { ...reservaExistente, ...req.body };

        await dbWithAuth_reservas.insert(reservaActualizada);
        res.json(reservaActualizada);
    } catch (error) {
        if (error.statusCode === 404) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.status(400).json({ error: error.message });
    }
};

// Borrar una reserva
const borrarReserva = async (req, res) => {
    const userid = req.token_usuarioId;

    try {
        const reserva = await dbWithAuth_reservas.get(userid);
        await dbWithAuth_reservas.destroy(reserva._id, reserva._rev);
        res.json({ message: 'Reserva eliminada' });
    } catch (error) {
        if (error.statusCode === 404) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearReserva,
    leerReservas,
    leerReservasPorUsuario,
    leerReservaPorId,
    actualizarReserva,
    borrarReserva
};
