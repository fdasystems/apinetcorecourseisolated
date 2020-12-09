import React, { useState, useEffect } from "react";
import { UncontrolledCollapse } from "reactstrap";
import ResponsivePlayer from './video/ResposivePlayer';

const ExpandMenuItem = (props) => {

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);



  useEffect(() => {
    const menuData = props.dataToExpand;
 //okconmock/NO-LOADconCallAPI const menuData = Array.from(props.dataToExpand);

      const returnMenuItem = (item, i) => {
      let menuItem;

      if (item.details===undefined || Array.from(item.details)===undefined || Array.from(item.details).length === 0) {
        menuItem = (
            <div key={item.id}  className={`item item-${item.order}`}>
            {console.log('itemorder=>'+ item.order)}
            <i className="glyphicon glyphicon-chevron-right"></i>
            {item.order + ' => ' + item.description}
            <ResponsivePlayer url={item.urlLink} />
            </div>
        );
      } else {
        let menuItemdetails = Array.from(item.details)
        .map((item, i) => {
          //console.log('menuItemdetails.urlLink=>'+item.urlLink + '   ===>i: =>'+i);
          let menuItem = returnMenuItem(item, i);
          return menuItem;
        });
        //if (item.name!==undefined) console.log('item.name inside else=>'+item.name+' ===>i: =>'+i);
        menuItem = (
          <div key={i} className="item">
            <div className="toggler" id={`toggle-menu-item-${item.id}`}>
            <i className="glyphicon glyphicon-chevron-right"></i> {item.name}
            </div>
            <UncontrolledCollapse
              className="details"
              toggler={`#toggle-menu-item-${item.id}`}
            >
              {menuItemdetails.sort((a, b) => (a.id > b.id) ? 1 : -1)}
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
