import { type } from 'os';
import React, { useState } from 'react';
import { Container, Dropdown, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle,
        CardText, Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import './commonStyleDesign.css';
//import '../../../node_modules/noty'
import Noty from 'noty';
import "../../../node_modules/noty/lib/themes/bootstrap-v4.css";

export const CardListCustom = ({itemId, itemCardTitle, itemCardSubtitle, itemCardText, deleteFunction, itemDeleteText}) =>
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

  const toggle = () => setModal(!modal);


  const confirmFunction = id => {
    console.log('but1 click', id);
    setModalLoadingDelete(true);
    deleteFunction(id);
    //setModalLoadingDelete(false);
  };







  return (
    <>
     <Card key={itemId} body outline color={shownHoverList[itemId] ? "danger": "success"} className="mx-auto my-2">
          <CardBody>
            <CardTitle>{itemCardTitle}</CardTitle>
            <CardSubtitle>{itemCardSubtitle}</CardSubtitle>
            <CardText>{itemCardText}</CardText>
            <Badge color='warning' className='btn-danger'>
              <Button key={itemId} onClick={toggle}
                className={shownHoverList[itemId] ?  'btn-remove-out' : 'btn-remove'}
                onMouseEnter={() => toggleHoverList(itemId)}
                onMouseLeave={() => toggleHoverList(itemId)}>{itemDeleteText}
              </Button>
            </Badge>
          </CardBody>
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
                  :  <Badge>  ...Eliminando datos...  ...Espere un momento por favor... </Badge>
        }
        </ModalFooter>
      </Modal>
    </div>

    </>
  )
}
