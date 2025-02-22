import { Row, Col, Button } from "react-bootstrap";
import { Jugador } from "./Jugador.js";
import { listadoSchema } from "../schemas/datosSchemas";

export const Listado = (props) => {
  const {
    jugadores,
    setJugador,
    setFormularioAbierto,
    formularioAbierto,
    eliminar,
  } = props;
  const editarJugador = (id) => {
    setJugador(jugadores.find((item) => item.id === id));
    setFormularioAbierto(!formularioAbierto);
  };
  const eliminarJugador = (id) => {
    try {
      if (!id || id === 0) throw new Error("Id invalido!");
      eliminar(id);
    } catch (error) {
      console.error(error.message);
    }
  };
  return jugadores.map(
    ({ id, nombre, apellidos, posicion, fechaNacimiento, goles }, i) => (
      <Col key={id} xs={12} md={6} lg={4} xl={3}>
        <Row>
          <Col className="d-flex">
            <h2>#{i + 1}</h2>
            <Button
              variant="warning"
              className="ml-2"
              onClick={() => editarJugador(id)}
            >
              Editar
            </Button>
            <Button
              variant="danger"
              className="ml-2"
              onClick={() => eliminarJugador(id)}
            >
              Eliminar
            </Button>
          </Col>
        </Row>
        <Jugador
          nombre={nombre}
          apellidos={apellidos}
          posicion={posicion}
          fechaNacimiento={fechaNacimiento}
          goles={goles}
        ></Jugador>
      </Col>
    )
  );
};
Listado.propTypes = listadoSchema;
