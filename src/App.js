import { Component } from "react";
import Buscador from "./componentes/Buscador"
import Resultado from "./componentes/Resultado";

class App extends Component {

  state = {
    termino: '',
    imagenes: [],
    pagina : ''
  }

  scroll = ()=>{
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }
  paginaAnterior = ()=>{
    //leer el state de la pagina actual
    let pagina = this.state.pagina;
    //leer si la pagina actual es 1
    if(pagina===1)return null;
    //restar uno a la pagina actual
    pagina -= 1;
    //agregar cambio al state
    this.setState({
      pagina
    }, ()=>{
      this.consultarApi();
      this.scroll();
    });
  }
  paginaSiguiente = ()=>{
    //leer el state de la pagina actual
    let pagina = this.state.pagina;
    //Sumar uno a la pagina actual
    pagina += 1;
    //agregar cambio al state
    this.setState({
      pagina
    }, ()=>{
      this.consultarApi();
      this.scroll();
    });
  }
  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=20390238-1136c10e67d6b900c8eadd3cc&q=${termino}&per_page=30&page=${pagina}`;
    console.log(url);
    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({ imagenes: resultado.hits }))
  }
  datosBusqueda = (termino) => {
    this.setState({
      termino : termino,
      pagina : 1
    }, () => {
      this.consultarApi();
    })
  }
  render() {
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imágenes</p>
          <Buscador
            datosBusqueda={this.datosBusqueda}
          />
        </div>
        <div className="row justify-content-center">
          <Resultado
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}


export default App;
