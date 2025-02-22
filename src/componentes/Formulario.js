import { Form, Button } from "react-bootstrap";
import { useFormulario } from "../hooks/useFormulario";
import { formularioSchema } from "../schemas/datosSchemas";
export const Formulario = (props) => {
  const {
    jugador,
    crearJugador,
    modificarJugador,
    setFormularioAbierto,
    formularioAbierto,
    setJugador,
  } = props;
  const { setDato, datosFormulario, validarFecha, controlFormulario } =
    useFormulario(jugador);

  const anyadirModificarJugador = () => {
    if (datosFormulario.id === 0) {
      crearJugador(datosFormulario);
    } else {
      modificarJugador(datosFormulario);
    }
    setFormularioAbierto(!formularioAbierto);
    vaciarFormulario();
  };
  const vaciarFormulario = () => {
    setJugador({
      id: 0,
      nombre: "",
      apellidos: "",
      posicion: "",
      fechaNacimiento: "",
      goles: 0,
    });
  };
  return (
    <Form noValidate>
      <Form.Group controlId="id">
        <Form.Control type="hidden" value={datosFormulario.id} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="nombre">
        <Form.Label>Nombre:</Form.Label>
        <Form.Control
          type="text"
          value={datosFormulario.nombre}
          onChange={setDato}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="apellidos">
        <Form.Label>Apellidos:</Form.Label>
        <Form.Control
          type="text"
          value={datosFormulario.apellidos}
          onChange={setDato}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="posicion">
        <Form.Label>Posicion:</Form.Label>
        <Form.Select
          aria-label="..."
          value={datosFormulario.posicion}
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
          value={datosFormulario.fechaNacimiento}
          onChange={(e) => {
            if (validarFecha(e)) setDato(e);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="goles">
        <Form.Label>Goles:</Form.Label>
        <Form.Control
          type="number"
          value={datosFormulario.goles}
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
  );
};
Formulario.propTypes = formularioSchema;
