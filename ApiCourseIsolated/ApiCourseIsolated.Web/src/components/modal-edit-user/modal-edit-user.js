import React, { useState, useContext, useEffect, ChangeEvent } from 'react';
import UserService from  '../../services/user.service';
import { Dropdown } from 'reactstrap';
import './modal-edit-user.css';
import {CourseToUser} from '../../services/types/CourseToUser.ts';
//'./../services/types/CourseToUser.ts';

/* Then can be moved to interface.course.ts
interface Course {
  id: number;
  name: string;
} */


const courseClaimName = 'course'; //TODO: then move to common or constant place

export const ModalEditUser = ({show, close, userName, Obs}) =>
{
  const [loadingGrid, setLoadingGrid] = useState(true);
  const [listCoursesUser, setListCoursesUser] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [listCourses, setListCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(0);
  const [loadingSetCourseToUser, setLoadingSetCourseToUser] = useState(true);
  const [selectSetCourseToUser, setSelectSetCourseToUser] = useState(false);

//then import context from azureass example notify AXIOS
  const notify = (pageLoad, msg, title) =>{
    console.log(pageLoad, msg, title);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadGrid = () => {
    if (userName) {
      setLoadingGrid(true);
      UserService
        .getMainCoursesWithDetailsFromUserName(userName)
        .then(r => {
          console.log(r);
          setListCoursesUser(r.data);
          setLoadingGrid(false);
        })
        .catch(() => {
                      setLoadingGrid(false);
                      notify('Carga de cursos de usuario', 'Errores al obtener datos', 'danger')
                      });
    } /*else if (!pageLoad) {
      notify('Carga', 'Ingrese datos', 'danger');
    }*/
  };

  const loadCourses = () =>{
    setLoadingCourses(true);
    UserService
      .getMainCourses()
      .then(r => {
        console.log(r);
        setListCourses(r.data);
        setLoadingCourses(false);
        setLoadingSetCourseToUser(false);
      })
      .catch(() =>{
                    setLoadingCourses(false);
                    notify('Carga de cursos de usuario', 'Errores al obtener datos', 'danger')
                  });
  }


  useEffect(() => {
    loadGrid();
    loadCourses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleChange = e => {
    const { value } = e.target;
    setSelectedCourseId(value);

    if (value>0){
      setSelectSetCourseToUser(false);
    }

  };

  const setCourseToUser = () => {
    if (selectedCourseId>0)
    {
        setSelectSetCourseToUser(false);
        setLoadingSetCourseToUser(true);
        const dto :  CourseToUser = {
          userEmail: userName,
          newClaimName: courseClaimName,
          newClaimValue: selectedCourseId
        };
        UserService
            .postCourseToUser(dto)
            .then(r => {
              console.log(r);          //setListCoursesUser(r.data);
              setLoadingSetCourseToUser(false);
              loadGrid();
            })
            .catch(() => { setLoadingSetCourseToUser(false);
                          notify('Carga de cursos de usuario', 'Errores al obtener datos', 'danger')
                          });
    }
    else
    {
      //alert('Debe seleccionar un valor');
      notify('Aignación de curso a usuario', 'Debe seleccionar un valor', 'danger' )
      setSelectSetCourseToUser(true);
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
      <p>Editar información de usuario</p>
      <span onClick={close}  className="close-modal-btn">X</span>
    </div>
    <div className="modal-content">
      <div className="modal-body">
        <h4>{userName}</h4>
        <h3>{Obs}</h3>
        <h5> Listado de cursos ya adquiridos por el usuario:</h5>

        {loadingGrid && (
          <React.Fragment>
          ..::Cargando cursos adquiridos::..
          <br />
          </React.Fragment>
        )}


        {!loadingGrid && (
          <React.Fragment>
            <ul>
              {
                  listCoursesUser.map( item =>(
                      <li key={item.id}> {item.name} </li>
                  ) )
              }
            </ul>
          </React.Fragment>
        )}

      <br />
      <h5> Listado de cursos disponibles para asignar:</h5>
        {loadingCourses && (
          <React.Fragment>
          ..::Cargando cursos del sistema::..
          <br />
          </React.Fragment>
        )}
        {!loadingCourses &&
          (
            <React.Fragment>
              <select name={userName} onChange={(e) => handleChange(e)}  defaultValue={{ label: "Seleccionar Curso", value: 0 }}>
                <option key="0" value="0" >Seleccionar Curso</option>
                {
                    listCourses.map( item =>(
                        <option key={item.id} value={item.id} > {item.name} </option>
                    ) )
                }
              </select>

              {selectSetCourseToUser && (
                <p>Debe seleccionar un curso</p>
              )}

            </React.Fragment>
          )
        }
        <br />
        <br />
        {!loadingSetCourseToUser &&
          (
            <button onClick={() => setCourseToUser()} className="btn-add"> ::Agregar Curso al usuario [enviar asignación]:: </button>
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
