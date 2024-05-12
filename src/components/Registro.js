import React from 'react';
import { CSSTransition } from 'react-transition-group';

const Registro = ({ registro }) => {
  return (
    <CSSTransition
      in={true}
      timeout={300}
      classNames="registro-animation"
      unmountOnExit
    >
      <tr>
        <td>{registro.id}</td>
        <td>{registro.tipo}</td>
        <td>{registro.laboratorio}</td>
        <td>{registro.entrada}</td>
        <td>{registro.salida || '-'}</td>
      </tr>
    </CSSTransition>
  );
};

export default Registro;