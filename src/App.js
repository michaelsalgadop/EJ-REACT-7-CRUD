import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { jugadores as datosAPI } from "./datos/jugadores";
import { Formulario } from "./componentes/Formulario";
import { Listado } from "./componentes/Listado";
import { Cabecera } from "./componentes/Cabecera";
function App() {
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [jugador, setJugador] = useState({
    id: 0,
    nombre: "",
    apellidos: "",
    posicion: "",
    fechaNacimiento: "",
    goles: 0,
  });
  const [jugadores, setJugadores] = useState([...datosAPI]);

  const getLastId = (prevDatos) =>
    prevDatos.reduce((acumulador, objeto) => {
      if (acumulador < objeto.id) {
        acumulador = objeto.id;
      }
      return acumulador;
    }, 0);
  const crear = (datosFormulario) => {
    setJugadores((datos) => [
      ...datos,
      { ...datosFormulario, id: getLastId(datos) + 1 },
    ]);
  };
  const modificar = (id, nuevosDatos) => {
    /** id => id del jugador nuevosDatos => objeto jugador del formulario*/
    setJugadores((datos) =>
      datos.map((item) => (item.id === id ? { ...item, ...nuevosDatos } : item))
    );
  };
  const eliminar = (id) => {
    setJugadores((datos) =>
      datos.filter((itemIterado) => itemIterado.id !== id)
    );
  };
  const crearJugador = (jugador) => {
    try {
      const { id } = jugador;
      if (id !== 0) throw new Error("Este jugador ya existe!");
      crear(jugador);
    } catch (error) {
      console.error(error.message);
    }
  };
  const modificarJugador = (jugador) => {
    try {
      const { id } = jugador;
      if (id === 0) throw new Error("Este jugador no existe!");
      modificar(id, jugador);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container className="contador">
      <Cabecera
        formularioAbierto={formularioAbierto}
        setFormularioAbierto={setFormularioAbierto}
      ></Cabecera>
      <Row>
        <Col>
          {formularioAbierto ? (
            <Formulario
              jugador={jugador}
              crearJugador={crearJugador}
              modificarJugador={modificarJugador}
              setFormularioAbierto={setFormularioAbierto}
              formularioAbierto={formularioAbierto}
              setJugador={setJugador}
            ></Formulario>
          ) : (
            <Row className="list-unstyled">
              {!jugadores && "Cargando..."}
              {jugadores && (
                <Listado
                  jugadores={jugadores}
                  setJugador={setJugador}
                  setFormularioAbierto={setFormularioAbierto}
                  formularioAbierto={formularioAbierto}
                  eliminar={eliminar}
                ></Listado>
              )}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
