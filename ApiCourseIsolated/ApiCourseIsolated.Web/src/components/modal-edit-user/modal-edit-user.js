import React, { useState, useContext, useEffect, ChangeEvent } from 'react';
import UserService from  '../../services/user.service';
import CourseService from '../../services/course.service';
import { Dropdown } from 'reactstrap';
import './modal-edit-user.css';
import {CourseToUser} from '../../services/types/CourseToUser.ts';
//'./../services/types/CourseToUser.ts';
import { CardListCustom } from '../common/CardListCustom';

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
      CourseService
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
    } 
  };

  const loadCourses = () =>{
    setLoadingCourses(true);
    CourseService
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
              console.log(r);
              setLoadingSetCourseToUser(false);
              loadGrid();
            })
            .catch(() => { setLoadingSetCourseToUser(false);
                          notify('Carga de cursos de usuario', 'Errores al obtener datos', 'danger')
                          });
    }
    else
    {
      notify('Aignación de curso a usuario', 'Debe seleccionar un valor', 'danger' )
      setSelectSetCourseToUser(true);
    }
  }

  const deleteCourseToUser = async (id) => {
    if (id>0)
    {
        setSelectSetCourseToUser(false);
        setLoadingSetCourseToUser(true);
        const dto :  CourseToUser = {
          userEmail: userName,
          newClaimName: courseClaimName,
          newClaimValue: id
        };
        return await  UserService
            .deleteCourseToUser(dto)
            .then(response => {
              console.log(response);
              setLoadingSetCourseToUser(false);
              //loadGrid();
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
            .catch(() => { setLoadingSetCourseToUser(false);
                          notify('Eliminación de curso a usuario', 'Errores al obtener datos', 'danger')
                          });
    }
    else
    {
      notify('Eliminación de curso a usuario', 'Debe seleccionar un valor', 'danger' )
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

                    <CardListCustom
                      key={item.id}
                      itemId={item.levelRequired}
                      itemCardTitle=""
                      itemCardSubtitle=""
                      itemCardText={item.name}
                      deleteFunction={() => deleteCourseToUser(item.levelRequired)}
                      itemDeleteText="::[X] Eliminar curso del usuario::"
                      urlToRedirect="admin"
                      >
                    </CardListCustom>
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
                        <option key={item.id} value={item.levelRequired} > {item.name} </option>
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
