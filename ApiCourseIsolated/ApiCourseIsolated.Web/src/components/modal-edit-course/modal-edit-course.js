import React, { useState, useContext, useEffect, ChangeEvent } from 'react';
import CourseService from  '../../services/course.service';
import { Dropdown } from 'reactstrap';
//import './modal-edit-user.css';
import {CourseToUser} from '../../services/types/CourseToUser.ts';
//'./../services/types/CourseToUser.ts';

/* Then can be moved to interface.course.ts
interface Course {
  id: number;
  name: string;
} */


const courseClaimName = 'course'; //TODO: then move to common or constant place

export const ModalEditCourse = ({show, close, name, id, levelRequired}) =>
{
  const [loadingGrid, setLoadingGrid] = useState(true);
  const [listVideosInCourse, setListVideosInCourse] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [listCourses, setListCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(0);
  const [loadingSetVideoToCourse, setLoadingSetVideoToCourse] = useState(true);
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
          setListVideosInCourse(r.data[0].details); //r.data  ==> en realidad luego viene uno solo esta funcion es de ejemplo trae varias
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
    //loadCourses();
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
            .postCourseToUser(dto)
            .then(r => {
              console.log(r);          //setListCoursesUser(r.data);
              setLoadingSetVideoToCourse(false);
              loadGrid();
            })
            .catch(() => { setLoadingSetVideoToCourse(false);
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
            <ul>
              {
                  listVideosInCourse.map( item =>(
                      <li key={item.id}> {item.order} : {item.urlLink} </li>
                  ) )
              }
            </ul>
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

              <input type="text" placeholder="urlLink" value={urlLink} onChange={handleChange} name="urlLink" />
              <input type="text" placeholder="order" value={order} onChange={handleChange} name="order" />
              <input type="text" placeholder="description" value={description} onChange={handleChange} name="description" />

              {selectSetVideoToCourse && (
                <p>Debe seleccionar un orden y url para el video (la descripcion es opcional)</p>
              )}

              <button onClick={() => setVideoToCourse()} className="btn-add"> ::Agregar video al curso [enviar asignación]:: </button>

            </React.Fragment>
          )
        }
        <br />
        <br />
        {!loadingSetVideoToCourse &&
          (
            <button onClick={() => setVideoToCourse()} className="btn-add"> ::Agregar video al curso [enviar asignación]:: </button>
          )
        }
      </div>
      <div className="modal-footer">
        <button onClick={close} className="btn-cancel">Cerrar</button>
      </div>
    </div>
  </div>
)
};
