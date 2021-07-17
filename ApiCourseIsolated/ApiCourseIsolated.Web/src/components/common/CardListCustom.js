import { type } from 'os';
import React, { useState } from 'react';
import { Container, Dropdown, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle,
         CardText, Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label,
         CardFooter } from 'reactstrap';
import './commonStyleDesign.css';
import "../../../node_modules/noty/lib/themes/bootstrap-v4.css";


export const CardListCustom = ({itemId, itemCardTitle, itemCardSubtitle, itemCardText, deleteFunction, itemDeleteText, itemCardFooter, urlToRedirect}) =>
{
  const [shownHoverList, setShownHoverList] = useState({});
  const toggleHoverList = id => {
    setShownHoverList(prevShownHoverList => ({
      ...prevShownHoverList,
      [id]: !prevShownHoverList[id]
    }));
  };

  const [modal, setModal] = useState(false);
  const [modalLoadingDelete, setModalLoadingDelete] = useState(false);
  const [modalAfterDelete, setModalAfterDelete] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(true);
  const [deleteMessage, setDeleteMessage] = useState('');

  const toggle = () => { 
                          setModal(!modal); 
                          setModalLoadingDelete(false); 
                          setModalAfterDelete(false);
                          setDeleteMessage('');
                        }

  const confirmFunction = id => {
    setModalLoadingDelete(true);
  
    deleteFunction(id).then(response => {
      if (response!=null) 
      {
        setDeleteFlag(response.operationResult);
        setDeleteMessage(response.message);
      }
      else
      {
        setDeleteFlag(false);
      }
      setModalAfterDelete(true);
    }).catch(err => {
      setDeleteFlag(false);
      setModalAfterDelete(true);
    });

  };


  const expandFunction = id => {
    itemCardFooter(id);
  };

  const controlButtonFunction = () => {
    toggle();
    let hrefToRedirect =  "/";
    if (urlToRedirect)
    {
      hrefToRedirect = hrefToRedirect + urlToRedirect;
    }
    console.log(hrefToRedirect);
    window.location.href = hrefToRedirect;
  };



  return (
    <>
     <Card key={itemId} body outline color={shownHoverList[itemId] ? "danger": "success"} className="mx-auto my-2">
          <CardBody className="btn btn-success">
            <CardTitle>{itemCardTitle}</CardTitle>
            <CardSubtitle>{itemCardSubtitle}</CardSubtitle>
            <CardText>{itemCardText}</CardText>


            <Badge color='danger' className='btn-danger'>
              <Button key={itemId} onClick={toggle}
                className={shownHoverList[itemId] ?  'btn-remove-out' : 'btn-remove'}
                onMouseEnter={() => toggleHoverList(itemId)}
                onMouseLeave={() => toggleHoverList(itemId)}>{itemDeleteText}
              </Button>
            </Badge>

          </CardBody>
          {itemCardFooter && (
          <CardFooter>
             <Button className="info" onClick={() => expandFunction(itemId)}>Expandir información/Contraer</Button> 
          </CardFooter>
        )}
         
      </Card>

      <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Confirmar eliminación</ModalHeader>
        <ModalBody>
          ¿Está seguro que desea eliminar este elemento?
        </ModalBody>
        <ModalFooter  style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
        {!modalLoadingDelete ?
                            (
                              <>
                              <Button color="danger" onClick={() => confirmFunction(itemId)}>Si, Eliminar</Button>{' '}

                              <Button  color="secondary" onClick={toggle}>Cancelar</Button>
                              </>
                            )
                            :  
                            (
                            <Badge>  ...Eliminando datos...  ...Espere un momento por favor... </Badge>
                            )
        }
        </ModalFooter>
      </Modal>
    </div>


    <div>
      <Modal isOpen={modalAfterDelete}>
        <ModalHeader>Resultado Operación</ModalHeader>
        <ModalBody>
        {deleteFlag ?
                                                        (
                                                          <div>
                                                          <Badge color="primary" > Éxito. </Badge>
                                                          <Badge color="primary" > {deleteMessage}</Badge>
                                                          </div>
                                                        ) 
                                                        :
                                                        (
                                                          <div>
                                                          <Badge color="error" > Han ocurrido errores al intentar eliminar. </Badge>
                                                          <Badge color="error" > {deleteMessage} </Badge>
                                                          </div>
                                                        ) 

        }
        </ModalBody>
        <ModalFooter  style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
          <Button color="danger" onClick={() => controlButtonFunction()}>Cerrar</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
    </>
  )
}
