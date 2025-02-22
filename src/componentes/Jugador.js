import { jugadorSchema } from "../schemas/datosSchemas";

export const Jugador = (props) => {
  const { nombre, apellidos, posicion, fechaNacimiento, goles } = props;
  return (
    <ul className="list-unstyled">
      <li>Nombre: {nombre}</li>
      <li>Apellidos: {apellidos}</li>
      <li>Posicion: {posicion}</li>
      <li>Fecha de nacimiento: {fechaNacimiento}</li>
      <li>Goles: {goles}</li>
    </ul>
  );
};
Jugador.propTypes = jugadorSchema;
