import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { cabeceraSchema } from "../schemas/datosSchemas";
export const Cabecera = React.memo((props) => {
  const { formularioAbierto, setFormularioAbierto } = props;
  return (
    <>
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
    </>
  );
});
Cabecera.propTypes = cabeceraSchema;
