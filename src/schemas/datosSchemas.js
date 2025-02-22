import PropTypes from "prop-types";
export const cabeceraSchema = {
  setFormularioAbierto: PropTypes.func.isRequired,
  formularioAbierto: PropTypes.bool.isRequired,
};
export const formularioSchema = {
  jugador: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string.isRequired,
    apellidos: PropTypes.string.isRequired,
    fechaNacimiento: PropTypes.string.isRequired,
    posicion: PropTypes.string.isRequired,
    goles: PropTypes.number.isRequired,
  }).isRequired,
  crearJugador: PropTypes.func.isRequired,
  modificarJugador: PropTypes.func.isRequired,
  setFormularioAbierto: PropTypes.func.isRequired,
  formularioAbierto: PropTypes.bool.isRequired,
  setJugador: PropTypes.func.isRequired,
};
export const jugadorSchema = {
  id: PropTypes.number,
  nombre: PropTypes.string.isRequired,
  apellidos: PropTypes.string.isRequired,
  fechaNacimiento: PropTypes.string.isRequired,
  posicion: PropTypes.string.isRequired,
  goles: PropTypes.number.isRequired,
};
export const listadoSchema = {
  jugadores: PropTypes.array.isRequired,
  eliminar: PropTypes.func.isRequired,
  setFormularioAbierto: PropTypes.func.isRequired,
  formularioAbierto: PropTypes.bool.isRequired,
  setJugador: PropTypes.func.isRequired,
};
