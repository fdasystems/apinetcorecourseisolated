import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

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
  if (isNaN(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        El valor debe ser un numero.
      </div>
    );
  }
};



const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        El password debe tener mas de 6 caracteres (y menos de 40).
      </div>
    );
  }
};

export default class RegisterCourse extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      nameCourse: "",
      levelRequired: "",
      successful: false,
      message: ""
    };
  }

  onChange(ev){
    this.setState({
        [ev.target.name]: ev.target.value
    })
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

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
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="C:\Users\sq5403\Desktop\react-jwt-auth-master\react-jwt-auth-master\src\images\book.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="nameCourse">Nombre del curso</label>
                  <Input type="text"
                  placeholder="nameCourse" value={this.state.nameCourse}
                  onChange={this.onChange} name="nameCourse"
                  validations={[required]} />
                </div>

                <div className="form-group">
                  <label htmlFor="levelRequired">Código de curso</label>
                  <Input type="text"
                  placeholder="levelRequired" value={this.state.levelRequired}
                   onChange={this.onChange} name="levelRequired"
                   validations={[required, numberValidation]}/>
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Registrar Nuevo Curso</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
