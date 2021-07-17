/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-comment-textnodes */
// eslint-disable-next-line no-undef
import  { useState } from "react";
import * as React from 'react';
import {ModalEditUser} from './../modal-edit-user/modal-edit-user';
import { CardListCustom } from '../common/CardListCustom';
import UserService from "../../services/user.service";

const ListUsers = props => {
  const [shownComments, setShownComments] = useState({});

  const toggleComment = id => {
    setShownComments(prevShownComments => ({
      ...prevShownComments,
      [id]: !prevShownComments[id]
    }));
  };

  const deleteUser = async (userName) => {
        
    const dto :  UserModel = {
          userName: userName,
          password: '',
          };

    return await UserService
        .deleteUser(dto)
        .then(response => {
          return response.data; 
        })
        .catch((error) => { 
          console.log(error);
        });            
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
                              urlToRedirect="admin"
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
