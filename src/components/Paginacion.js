import React from 'react';

const Paginacion = props => {
  return (
    <div className="py-3">
      <button type="button"
        onClick={props.paginaAnterior}
        className="btn btn-outline-info mr-1">
          &larr; Anterior
      </button>
      <button type="button"
        onClick={props.paginaSiguiente}
        className="btn btn-outline-info">
          Siguiente &rarr;
      </button>
    </div>
  );
}

export default Paginacion;