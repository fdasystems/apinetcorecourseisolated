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

const ListUsers = props => {
  const [shownComments, setShownComments] = useState({});

  const toggleComment = id => {
    setShownComments(prevShownComments => ({
      ...prevShownComments,
      [id]: !prevShownComments[id]
    }));
  };

  //const closeModalHandler = (i) => toggleComment(i);   //call close={closeModalHandler(i)}
  //call back-drop //Puede haber lio con el tactil si lo agrego\\ onClick={() => toggleComment(i)}

  return (
    <>
      {Array.from(props.items).map((obj,i) => (
        // eslint-disable-next-line react/react-in-jsx-scope
        <div key={i}>
          {shownComments[i] ?<div className="back-drop"> </div> : null}

          {obj.userName ? (
            // eslint-disable-next-line react/react-in-jsx-scope
            <button onClick={() => toggleComment(i)}>{obj.userName}</button>

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
