import { useState } from "react";
import { DateTime } from "luxon";
export const useFormulario = (datosElementosFormulario) => {
  const [datosFormulario, setDatosFormulario] = useState(
    datosElementosFormulario
  );
  const setDato = (e) => {
    const elemento = e.target;
    setDatosFormulario({
      ...datosFormulario,
      [elemento.id]:
        elemento.type === "checkbox"
          ? elemento.checked
          : elemento.type === "number"
          ? elemento.valueAsNumber
          : elemento.value,
    });
  };
  const validarFecha = (e) => {
    const valorFecha = e.target.value;
    const fechaNacimiento = DateTime.fromISO(valorFecha);
    return fechaNacimiento <= DateTime.now() && fechaNacimiento.isValid;
  };
  const comprobarCamposFormulario = () => {
    return Object.values(datosFormulario).some(
      (valor) => valor === null || valor === undefined || valor === ""
    );
  };
  const controlFormulario = comprobarCamposFormulario();
  return {
    setDato,
    datosFormulario,
    validarFecha,
    controlFormulario,
  };
};
