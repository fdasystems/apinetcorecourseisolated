import React, { Component } from "react";
import UserService from "../services/user.service";
import './modal-edit-user/modal-edit-user.css';
import ListUsers from './list-users/list-users.js';
import { Switch, Route, Link } from "react-router-dom";
import MainListCourses from "./main-list-courses.component";



export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      done:false,
      success: true
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        //console.log("response", response);
        //console.log("response.data", response.data);
        this.setState({
          content: response.data,
          done: true
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
            done: true,
            success: false
        });
      }
    );
  }

  render() {
      if(this.state.done) {
          return (
              <div>

              <li className="nav-item">
                <Link to={"/managecourses"} className="nav-link">
                  Gestión de cursos
                </Link>

                <h2>
                  Gestión de Usuarios
                </h2>
              </li>

                  {
                      this.state.done && this.state.success /*&& this.state.content.isArray()  verificar como se chequea*/ ? (
                        <ListUsers items={this.state.content} />
                      ) : (
                          <p>No se han podido recuperar los datos del servidor</p>
                      )
                  }






              </div>

          )
      } else {
          return (<p>Cargando contenidos...</p>)
      }
  }
}
