import React, { Component } from 'react';
import Buscador from './components/Buscador';
import Resultado from './components/Resultado';

import './App.css'

class App extends Component {

  state = {
    termino: '',
    imagenes: [],
    pagina: ''
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }

  paginaAnterior = () => {
      // leer el state de la pagina actual
      let pagina = this.state.pagina;
      // si la página es uno ya no ir a tras
      if (pagina === 1) return null;
      // resta uno a la pagina actual
      pagina -= 1;
      // agregar el cambio al state
      this.setState({
        pagina
      }, () => {
        this.consumirApi();
        this.scroll();
      });
  }

  paginaSiguiente = () => {
    // leer el state de la pagina actual
    let pagina = this.state.pagina;
    // suma uno a la pagina actual
    pagina += 1;
    // agregar el cambio al state
    this.setState({
      pagina
    }, () => {
      this.consumirApi();
      this.scroll();
    });
  }

  consumirApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=12815403-69455376b6eb621d18e3470c2&q=${termino}&per_page=30&page=${pagina}`;
    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({
        imagenes: resultado.hits
      }))
  }

  datosBusqueda = (termino) => {
    this.setState({
      termino,
      pagina: 1
    }, () => {
      this.consumirApi();
    })
  }

  render() {
    return (
      <div className="app container">
        <div className="jumbotron">
          <h1 className="text-center rouder">Buscador de imagenes</h1>
          <Buscador 
            datosBusqueda={this.datosBusqueda} 
          />
        </div>
        <div className="row justify-content-center">
          <h2>{this.state.pagina}</h2>
        </div>
        <div className="row justify-content-center">
          <Resultado
            imagen={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}

export default App;
