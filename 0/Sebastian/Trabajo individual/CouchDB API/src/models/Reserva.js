class Reserva {
    constructor(fecha_reserva, estado, id_usuario, detalles) {
        this.fecha_reserva = fecha_reserva;
        this.estado = estado;
        this.id_usuario = id_usuario;
        this.detalles = detalles;
    }
}

module.exports = Reserva;