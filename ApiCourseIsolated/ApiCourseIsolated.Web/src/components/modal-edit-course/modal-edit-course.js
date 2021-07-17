import React, { useState, useContext, useEffect, ChangeEvent } from 'react';
import CourseService from  '../../services/course.service';
import { Container, Dropdown, Row, Col, Card, CardImg, CardBody, CardTitle, 
         CardSubtitle, CardText, Badge, Button } from 'reactstrap';
import './modal-edit-course.css';
import {CourseToUser} from '../../services/types/CourseToUser.ts';
import { CardListCustom } from '../common/CardListCustom';


const courseClaimName = 'course'; //TODO: then move to common or constant place

export const ModalEditCourse = ({show, close, name, id, levelRequired}) =>
{
  const [loadingGrid, setLoadingGrid] = useState(true);
  const [listVideosInCourse, setListVideosInCourse] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [listCourses, setListCourses] = useState([]);
  const [loadingDeleteVideoToCourse, setLoadingDeleteVideoToCourse] = useState(false);
  const [loadingSetVideoToCourse, setLoadingSetVideoToCourse] = useState(false);
  const [selectSetVideoToCourse, setSelectSetVideoToCourse] = useState(false);

  const [urlLink, setUrlLink] = useState('');
  const [order, setOrder] = useState(0);
  const [description, setDescription] = useState('');

//then import context from azureass example notify AXIOS
  const notify = (pageLoad, msg, title) =>{
    console.log(pageLoad, msg, title);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadGrid = () => {
    if (id) {
      setLoadingGrid(true);
      CourseService
        .getSimpleDetailsFromMainCourse(id)
        .then(r => {
          console.log(r);
          setListVideosInCourse(r.data.details);
          setLoadingGrid(false);
        })
        .catch(() => {
                      setLoadingGrid(false);
                      notify('Carga de videos de cursos', 'Errores al obtener datos', 'danger')
                      });
    }
  };



  useEffect(() => {
    loadGrid();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleChange = e => {
    const { value } = e.target;

    switch(e.target.name) {
      case 'urlLink':
        return setUrlLink(value);
      case 'order':
          return setOrder(value);
      case 'description':
            return setDescription(value);
      default:
        return '';
    }
  };


  const setVideoToCourse = () => {
    if ((id>0) && urlLink && order>0)
    {
        setSelectSetVideoToCourse(false);
        setLoadingSetVideoToCourse(true);
        const dto :  VideoToCourse = {
          urlLink: urlLink,
          order: order,
          description: description,
          mainCourseId: id
        };
        console.log(dto);
        CourseService
            .postVideoToCourse(dto)
            .then(r => {
              console.log(r);          //setListCoursesUser(r.data);
              setLoadingSetVideoToCourse(false);
              loadGrid();
            })
            .catch(() => { 
                           setLoadingSetVideoToCourse(false);
                           notify('Carga de cursos de usuario', 'Errores al obtener datos', 'danger')
                          });
    }
    else
    {
      //alert('Debe seleccionar un valor');
      notify('Aignación de video a curso', 'Debe seleccionar un valor', 'danger' )
      setSelectSetVideoToCourse(true);
    }
  }

  const deleteVideoToCourse = async (id) => {
    if (id>0)
    {
        setLoadingDeleteVideoToCourse(true);
        console.log('borrando del video id:',id);
        // eslint-disable-next-line no-restricted-globals

        return await CourseService
            .postDeleteVideoFromCourse(id)
            .then(response => {
              console.log(response);
              setLoadingDeleteVideoToCourse(false);
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
            .catch(() => { 
                          setLoadingDeleteVideoToCourse(false);
                          notify('Carga de cursos de usuario', 'Errores al obtener datos', 'danger')
                          });

    }
    else
    {
      notify('Eliminación de video de curso', 'Debe seleccionar un valor', 'danger' )
      setLoadingDeleteVideoToCourse(false);
    }
  }

 return (
  <div className="modal-wrapper"
       style={{
          transform: show ? 'translate(0vh)': 'translate(-100vh)',
          opacity: show ? '1':'0'
       }}
  >
    <div className="modal-header">
      <p>Editar información de curso</p>
      <span onClick={close}  className="close-modal-btn">X</span>
    </div>
    <div className="modal-content">
      <div className="modal-body">
        <h4>{name}</h4>
        <h3>{levelRequired}</h3>
        <h5> Listado de videos pertenecientes al curso:</h5>

        {loadingGrid && (
          <React.Fragment>
          ..::Cargando videos del curso::..
          <br />
          </React.Fragment>
        )}


        {!loadingGrid && (
          <React.Fragment>
            <Container>
              <Row>
                <Col>
                    {
                        listVideosInCourse.sort((a, b) => (a.order > b.order) ? 1 : -1).map( item =>(
                            <CardListCustom key={item.id}
                                            itemId={item.id}
                                            itemCardTitle={`Orden #${item.order}`}
                                            itemCardSubtitle={item.urlLink}
                                            itemCardText={item.description}
                                            deleteFunction={() => deleteVideoToCourse(item.id)}
                                            itemDeleteText="::[X] Eliminar video::"
                                            urlToRedirect="managecourses"
                                            >
                            </CardListCustom>
                        ) )
                    }
                </Col>
              </Row>
            </Container>
          </React.Fragment>
        )}

      <br />
      <h5> Asignar Url de videos al curso:</h5>
        {loadingGrid && (
          <React.Fragment>
          ..::Cargando datos del sistema::..
          <br />
          </React.Fragment>
        )}
        {!loadingGrid &&
          (
            <React.Fragment>
              <input key={1} type="text" placeholder="orden" value={order} onChange={handleChange} name="order" style={{width: "70px"}} />
              <br />
              <input key={2} type="text" placeholder="urlLink" value={urlLink} onChange={handleChange} name="urlLink" style={{width: "95%"}}/>
              <br />
              <input key={3} type="text" placeholder="descripción" value={description} onChange={handleChange} name="description" style={{width: "99%"}} />
              <br />
              <br />

              {selectSetVideoToCourse && (
                <p>Debe seleccionar un orden y url para el video (la descripcion es opcional)</p>
              )}

        {!loadingSetVideoToCourse &&
          (
            <button onClick={() => setVideoToCourse()} className="btn-add"> ::Agregar video al curso [Enviar asignación]:: </button>
          )
        }
            </React.Fragment>
          )
        }
        <br />
        <br />

      </div>
      <div className="modal-footer">
        <button onClick={close} className="btn-cancel">Cerrar</button>
      </div>
    </div>
  </div>
)
};
