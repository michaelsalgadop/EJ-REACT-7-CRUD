import { useState } from "react";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import { DateTime } from "luxon";
import { jugadores as jugadoresAPI } from "./datos/jugadores";
function App() {
  const [datos, setDatos] = useState([...jugadoresAPI]);
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [jugador, setJugador] = useState({
    id: 0,
    nombre: "",
    apellidos: "",
    posicion: "",
    fechaNacimiento: "",
    goles: 0,
  });
  const setDato = (e) => {
    const elemento = e.target;
    setJugador({
      ...jugador,
      [elemento.id]:
        elemento.type === "checkbox" ? elemento.checked : elemento.value,
    });
  };
  const validarFecha = (e) => {
    const valorFecha = e.target.value;
    const fechaNacimiento = DateTime.fromISO(valorFecha);
    return fechaNacimiento <= DateTime.now() && fechaNacimiento.isValid;
  };
  const comprobarCamposFormulario = () => {
    const { nombre, apellidos, posicion, fechaNacimiento, goles } = jugador;
    return !nombre || !apellidos || !posicion || !fechaNacimiento || !goles;
  };
  const controlFormulario = comprobarCamposFormulario();
  const getLastId = () =>
    datos.reduce((acumulador, jugador) => {
      if (acumulador < jugador.id) {
        acumulador = jugador.id;
      }
      return acumulador;
    }, 0);
  const anyadirModificarJugador = () => {
    if (jugador.id === 0) {
      setDatos([...datos, { ...jugador, id: getLastId() + 1 }]);
    } else {
      setDatos(
        datos.map((jugadorIterado) => {
          if (jugador.id === jugadorIterado.id) {
            return {
              ...jugadorIterado,
              nombre: jugador.nombre,
              apellidos: jugador.apellidos,
              posicion: jugador.posicion,
              fechaNacimiento: jugador.fechaNacimiento,
              goles: jugador.goles,
            };
          }
          return jugadorIterado;
        })
      );
    }
    setFormularioAbierto(!formularioAbierto);
  };
  const buscarJugador = (id) => {
    let jugadorEncontrado = null;
    datos.forEach((jugadorIterado) => {
      if (jugadorIterado.id === id) {
        jugadorEncontrado = jugadorIterado;
      }
    });
    return jugadorEncontrado;
  };
  const editarJugador = (id) => {
    setFormularioAbierto(true);
    const jugadorBuscado = buscarJugador(id);
    if (jugadorBuscado !== null) setJugador(jugadorBuscado);
  };
  const borrarJugador = (id) => {
    const jugadorBuscado = buscarJugador(id);
    if (jugadorBuscado !== null)
      setDatos(
        datos.filter(
          (jugadorIterado) => jugadorIterado.id !== jugadorBuscado.id
        )
      );
  };
  return (
    <Container className="contador">
      <Row as="header">
        <Col as="h1" className="text-center">
          {formularioAbierto
            ? "Formulario del jugador"
            : "Listado de jugadores"}
        </Col>
      </Row>
      {!formularioAbierto && (
        <Row>
          <Col className="text-right">
            <Button
              variant="primary"
              onClick={() => setFormularioAbierto(true)}
            >
              Crear jugador
            </Button>
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          {formularioAbierto ? (
            <Form noValidate>
              <Form.Group controlId="id">
                <Form.Control type="hidden" value={jugador.id} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="nombre">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  type="text"
                  value={jugador.nombre}
                  onChange={setDato}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="apellidos">
                <Form.Label>Apellidos:</Form.Label>
                <Form.Control
                  type="text"
                  value={jugador.apellidos}
                  onChange={setDato}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="posicion">
                <Form.Label>Posicion:</Form.Label>
                <Form.Select
                  aria-label="..."
                  value={jugador.posicion}
                  onChange={setDato}
                  className="form-control"
                >
                  <option value="">...</option>
                  <option value="GK">Portero</option>
                  <option value="LB">Lateral Izquierdo</option>
                  <option value="RB">Lateral Derecho</option>
                  <option value="CB">Defensa Central</option>
                  <option value="CDM">Mediocentro defensivo</option>
                  <option value="CM">Mediocentro</option>
                  <option value="CAM">Mediocentro ofensivo</option>
                  <option value="LW">Extremo izquierdo</option>
                  <option value="RW">Extremo derecho</option>
                  <option value="ST">Delantero</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="fechaNacimiento">
                <Form.Label>Fecha de nacimiento:</Form.Label>
                <Form.Control
                  type="date"
                  value={jugador.fechaNacimiento}
                  onChange={(e) => {
                    if (validarFecha(e)) setDato(e);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="goles">
                <Form.Label>Goles:</Form.Label>
                <Form.Control
                  type="number"
                  value={jugador.goles}
                  onChange={setDato}
                />
              </Form.Group>
              <Button
                type="button"
                variant="success"
                onClick={anyadirModificarJugador}
                disabled={controlFormulario}
              >
                Enviar
              </Button>
            </Form>
          ) : (
            <Row className="list-unstyled">
              {datos.map(
                (
                  { id, nombre, apellidos, posicion, fechaNacimiento, goles },
                  i
                ) => (
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
                          onClick={() => borrarJugador(id)}
                        >
                          Eliminar
                        </Button>
                      </Col>
                    </Row>
                    <ul className="list-unstyled">
                      <li>Nombre: {nombre}</li>
                      <li>Apellidos: {apellidos}</li>
                      <li>Posicion: {posicion}</li>
                      <li>Fecha de nacimiento: {fechaNacimiento}</li>
                      <li>Goles: {goles}</li>
                    </ul>
                  </Col>
                )
              )}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
