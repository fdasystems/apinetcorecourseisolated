/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-comment-textnodes */
// eslint-disable-next-line no-undef
//const { useState, Fragment } = React;
//import React, { Component } from "react";
import  { useState } from "react";
import * as React from 'react';
import {ModalEditUser} from './../modal-edit-user/modal-edit-user';
import { CardListCustom } from '../common/CardListCustom';

const ListUsers = props => {
  const [shownComments, setShownComments] = useState({});

  const toggleComment = id => {
    setShownComments(prevShownComments => ({
      ...prevShownComments,
      [id]: !prevShownComments[id]
    }));
  };

  const deleteUser = (id) => {
    console.log(id);
    /*
        setSelectSetCourseToUser(false);
        setLoadingSetCourseToUser(true);
        const dto :  CourseToUser = {
          userEmail: userName,
          newClaimName: courseClaimName,
          newClaimValue: id
        };
        UserService
            .deleteCourseToUser(dto)
            .then(r => {
              console.log(r);          //setListCoursesUser(r.data);
              setLoadingSetCourseToUser(false);
              loadGrid();
            })
            .catch(() => { setLoadingSetCourseToUser(false);
                          notify('Eliminación de curso a usuario', 'Errores al obtener datos', 'danger')
                          });
                          */

  }

  return (
    <>
      {Array.from(props.items).map((obj,i) => (
        // eslint-disable-next-line react/react-in-jsx-scope

        <div key={i}>
 

          {obj.userName ? (
            // eslint-disable-next-line react/react-in-jsx-scope
            <div>
                      <CardListCustom key={i}
                              itemId={i}
                              itemCardTitle={`Usuario`}
                              itemCardSubtitle={obj.userName}
                              itemCardText={obj.Obs}
                              deleteFunction={() => deleteUser(obj.userName)}
                              itemDeleteText="::[X] Eliminar usuario::"
                              className="btn btn-success"
                              itemCardFooter={() => toggleComment(i)}
                              >
                      </CardListCustom>
              </div>

          ) : null}

          {shownComments[i] ?
                            (

                            <ModalEditUser
                                    show={shownComments[i]}
                                    close={() => toggleComment(i)}
                                    userName={obj.userName}
                                    obs={obj.Obs}
                                    />
                            )
                            : null}
        </div>
      ))}
    </>
  );
};

export default ListUsers;
