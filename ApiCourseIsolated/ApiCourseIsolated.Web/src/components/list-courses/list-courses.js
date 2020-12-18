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

const ListCourses = props => {
  const [shownComments, setShownComments] = useState({});

  const toggleComment = id => {
    setShownComments(prevShownComments => ({
      ...prevShownComments,
      [id]: !prevShownComments[id]
    }));
  };

  return (
    <>
      {Array.from(props.items).map((obj,i) => (
        // eslint-disable-next-line react/react-in-jsx-scope
        <div key={i}>
          {shownComments[i] ?<div className="back-drop"> </div> : null}

          {obj.name ? (
            // eslint-disable-next-line react/react-in-jsx-scope
            <button onClick={() => toggleComment(i)}>{obj.name}</button>

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
