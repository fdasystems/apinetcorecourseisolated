import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }


  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3 className="center">.:: Bienvenido a Amino Relaxer - Portal de cursos y capacitaciones ::.</h3>
        </header>
        <body>
          <h4>Diríjase por favor al login para acceder a su panel personalizado.</h4>
          <br ></br>
          <h5>Esperamos que el contenido sea de su agrado.</h5>
          <br ></br>         
          <h6>Cuando haya finalizado pulse Salir para cerrar su sesión</h6>

        </body>
      </div>
    );
  }
}
