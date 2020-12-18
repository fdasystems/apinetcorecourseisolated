import React, { Component } from "react";
import CourseService from "../services/course.service";
import './modal-edit-user/modal-edit-user.css';
import ListCourses from './list-courses/list-courses.js';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Switch, Route, Link } from "react-router-dom";



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



  render() {
      if(this.state.done) {
          return (
              <div>

                <li className="nav-item">
                <Link to={"/registernewcourse"} className="nav-link">
                  Agregar nuevo curso
                </Link>
                </li>
                <li>
                  {
                      this.state.done && this.state.success ? (
                        <ListCourses items={this.state.content} />
                      ) : (
                          <p>No se han podido recuperar los datos del servidor</p>
                      )
                  }
                </li>
              </div>
          )
      } else {
          return (<p>Cargando contenidos...</p>)
      }
  }
}
