/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-comment-textnodes */
// eslint-disable-next-line no-undef
//const { useState, Fragment } = React;
//import React, { Component } from "react";
import  { useState } from "react";
import * as React from 'react';
import {ModalEditCourse} from './../modal-edit-course/modal-edit-course';
import CourseService from  '../../services/course.service';
import { Redirect } from 'react-router';
import { CardListCustom } from '../common/CardListCustom';

const ListCourses = props => {
  const [shownComments, setShownComments] = useState({});
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const toggleComment = id => {
    setShownComments(prevShownComments => ({
      ...prevShownComments,
      [id]: !prevShownComments[id]
    }));
  };


  const deleteCourse = (id) => {
    if (id>0)
    {
        console.log('borrando del curso id:',id);
        CourseService
            .postDeleteCourse(id)
            .then(r => {
              console.log(r);
              //setLoadingDeleteVideoToCourse(false);
              //loadGrid();
              // eslint-disable-next-line no-restricted-globals
             // history.push(`/admin`);
             setDeleteSuccess(true);
            })
            .catch((error) => { //setLoadingDeleteVideoToCourse(false);
                           //notify('Eliminación de cursos', 'Errores al ejecutar operación', 'danger')
                           console.log(error);
                          });
    }
    else
    {
      //alert('Debe seleccionar un valor');
      //notify('Eliminación de curso', 'Debe seleccionar un valor', 'danger' )
      //setLoadingDeleteVideoToCourse(false);
    }
  }


  if (deleteSuccess) {
    return <Redirect to='/admin' />
  }


  return (
    <>
      {Array.from(props.items).map((obj,i) => (
        // eslint-disable-next-line react/react-in-jsx-scope
        <div key={i}>
          {shownComments[i] ?<div className="back-drop">  </div> : null}

          {obj.name ? (
            // eslint-disable-next-line react/react-in-jsx-scope
            <div>
              <table>
                <thead><button className="btn-secondary" onClick={() => toggleComment(i)}>
                Editar información de curso
              </button></thead>
                <tbody><tr><td><CardListCustom
              key={i}
              itemId={i}
              itemCardTitle={`Curso`}
              itemCardSubtitle={obj.name}
              itemCardText={obj.levelRequired}
              deleteFunction={() => deleteCourse(obj.id)}
              itemDeleteText="::[X] Eliminar Curso::"
              >
              </CardListCustom></td></tr></tbody>
              </table>


            </div>

          ) : null}

          {shownComments[i] ?
                            (

                            <ModalEditCourse
                                    show={shownComments[i]}
                                    close={() => toggleComment(i)}
                                    name={obj.name}
                                    id={obj.id}
                                    levelRequired={obj.levelRequired}
                                    />
                            )
                            : null}
        </div>
      ))}
    </>
  );
};

export default ListCourses;
