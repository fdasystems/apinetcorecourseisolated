import React, { useState, useEffect } from "react";
import { UncontrolledCollapse, Container, Dropdown, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle,
  CardText, Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import ResponsivePlayer from './video/ResposivePlayer';
import { CardListItemCustom } from './common/CardListItemCustom';

const ExpandMenuItem = (props) => {

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);



  useEffect(() => {
    const menuData = props.dataToExpand;
      const returnMenuItem = (item, i) => {
      let menuItem;

      if (item.details===undefined || Array.from(item.details)===undefined || Array.from(item.details).length === 0) {
        menuItem = (
              <CardListItemCustom
                key={item.id}
                itemId={item.id}
                itemCardTitle={item.order}
                itemCardSubtitle={item.description}
                itemCardUrlLink={item.urlLink}
                className={`item item-${item.order}`}
              >
              </CardListItemCustom>
        );
      } else {
        let menuItemdetails = Array.from(item.details)
        .sort((a, b) => (a.order < b.order) ? 1 : -1)
        .map((item, i) => {
          let menuItem = returnMenuItem(item, i);
          return menuItem;
        });
        menuItem = (
          <div key={i}>
            <Card 
              id={`toggle-menu-item-${item.id}`} 
              key={i} 
              body 
              outline 
              color="success" 
              className="mx-auto my-2">
                  <CardBody className="btn btn-success">
                    <CardTitle>Tu curso de:</CardTitle>
                    <CardSubtitle>{item.name}</CardSubtitle>
                    <CardText className="font-weight-bold">(Clic para expandir/contraer)</CardText>
                  </CardBody>
            </Card>
            <UncontrolledCollapse
              className="details"
              toggler={`#toggle-menu-item-${item.id}`}
            >
              {menuItemdetails.sort((a, b) => (a.order < b.order) ? 1 : -1)}
            </UncontrolledCollapse>
          </div>
        );
      }
      return menuItem;
    };

    const loadEmtpyMessage=(flagError)=>
    {
      let menuItems;

      if (flagError){
        menuItems = (
          <>
          <div>Ha ocurrido un error al intentar buscar tus videos</div>
          <div  className='item'>
          <i className="glyphicon glyphicon-chevron-right"></i>
          Sin datos para mostrar
          </div>
          </>
        )
      }
      else{
        menuItems = (
          <>
          <div>No hay videos asignados a su perfil</div>
          <div  className='item'>
          <i className="glyphicon glyphicon-chevron-right"></i>
          Sin datos para mostrar
          </div>
          </>
        )
      }
      return menuItems;
    }

    const load = async () => {
      let menuItems;
      setLoading(false);
      if (typeof(menuData)==='object')
      {
        //set empty message or set dataload
        menuItems =  menuData.length===0 ? loadEmtpyMessage(false) : await menuData.map((item, i) => {
          let menuItem = returnMenuItem(item, i);
          return menuItem;
        });
      }
      else
      {
        //null or error exit
        menuItems = loadEmtpyMessage(true);
      }

      setItems(menuItems);
    };
    if (loading) {
       load();
    }
  }, [loading, props, props.config]);

  return <div className="items">{items}</div>;
};
export default ExpandMenuItem;
