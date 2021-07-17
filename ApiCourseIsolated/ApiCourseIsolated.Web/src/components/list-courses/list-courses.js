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

  const toggleComment = id => {
    setShownComments(prevShownComments => ({
      ...prevShownComments,
      [id]: !prevShownComments[id]
    }));
  };


  const deleteCourse = async (id) => {
    if (id>0)
    {
        console.log('borrando del curso id:',id);
        return await CourseService
            .postDeleteCourse(id)
            .then(response => {
              console.log(response);
              if (response.status)
              {
                let result = response.status===200;
                  const dtoResult :  ResponseDelete = {
                    operationResult: result,
                    message: result ? "Elemento eliminado exitosamente": "Error al eliminar"
                  };
                  return dtoResult;
              }
              return response.data;
            })
            .catch((error) => { 
              console.log(error);
            });
    }
  }


  return (
    <>
      {Array.from(props.items).map((obj,i) => (
        // eslint-disable-next-line react/react-in-jsx-scope
        <div key={i}>
  

          {obj.name ? (
            // eslint-disable-next-line react/react-in-jsx-scope
            <div>

                      <CardListCustom
                        key={i}
                        itemId={i}
                        itemCardTitle={`Curso`}
                        itemCardSubtitle={obj.name}
                        itemCardText={obj.levelRequired}
                        deleteFunction={() => deleteCourse(obj.id)}
                        itemDeleteText="::[X] Eliminar Curso::"
                        itemCardFooter={() => toggleComment(i)}
                        urlToRedirect="managecourses"
                        >
                        </CardListCustom>

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
