import React, { Component } from "react";
import CourseService from "../services/course.service";
import './modal-edit-user/modal-edit-user.css';
import ListCourses from './list-courses/list-courses.js';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Switch, Route, Link } from "react-router-dom";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        ¡El campo es requerido!
      </div>
    );
  }
};

const numberValidation = value => {
  if (!isNaN(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        El valor debe ser un numero.
      </div>
    );
  }
};

export default class MainListCourses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      done:false,
      success: true,
      nameCourse: "",
      levelRequired: ""
    };

    this.onChange = this.onChange.bind(this);
  }


 /* loadSimpleFromModalExample
  const loadCourses = () =>{
    setLoadingCourses(true);
    CourseService
      .getMainCourses()
      .then(r => {
        console.log(r);
        setListCourses(r.data);
        setLoadingCourses(false);
        setLoadingSetVideoToCourse(false);
      })
      .catch(() =>{
                    setLoadingCourses(false);
                    notify('Carga de cursos de usuario', 'Errores al obtener datos', 'danger')
                  });
  }
*/



  componentDidMount() {
    CourseService.getMainCourses().then(
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

  onChange(ev){
    this.setState({
        [ev.target.name]: ev.target.value
    })
  }

  handleRegister(e) {
    e.preventDefault();

    /*this.setState({
      message: "",
      successful: false
    });*/

    this.form.validateAll();


    /*
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
    //SKIP    this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
    */
  }

  render() {
      if(this.state.done) {
          return (
              <div>

                <li className="nav-item">
                <Link to={"/registernewcourse"} className="nav-link">
                  Agregar nuevo curso
                </Link>
                </li>


                <Form
                    onSubmit={this.handleRegister}
                    ref={c => {
                      this.form = c;
                    }}
                >
                  <Input type="text"
                  placeholder="nameCourse" value={this.state.nameCourse}
                  onChange={this.onChange} name="nameCourse"
                  validations={[required]} />

                  <Input type="text"
                  placeholder="levelRequired" value={this.state.levelRequired}
                   onChange={this.onChange} name="levelRequired"
                   validations={[required, numberValidation]}/>

                  <div className="form-group">
                    <button className="btn btn-primary btn-block">Registrar nuevo curso</button>
                  </div>

                  <CheckButton
                    style={{ display: "none" }}
                    ref={c => {
                      this.checkBtn = c;
                    }}
                  />
                </Form>

                  {
                      this.state.done && this.state.success ? (
                        <ListCourses items={this.state.content} />
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
