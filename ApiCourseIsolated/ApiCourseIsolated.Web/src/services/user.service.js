import axios from 'axios';
import authHeader from './auth-header';
import customHeader from './custom-header';
import AuthService from "./auth.service";
import { Redirect } from "react-router-dom";
import CourseToUser from './types/CourseToUser.ts';
//no iria... import React from 'react';
//no iria... import ReactDOM from 'react-dom';


//const API_URL = 'https://localhost:44394/api/';
const API_URL = "http://apicourseisolated.azurewebsites.net/api/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {

    /* probar con INTERCEPTORS    */

    /*InterceptorRequest=ok*/
    axios.interceptors.request.use(function (config) {
      // Do something before request is sent
     // let token = authHeader(); //ojo cambiar la forma que mando el token porque es distinto como se configura
     // config.headers.Authorization = `Bearer ${token}`;
     //config.headers = customHeader();
     config.headers = authHeader();
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    /*InterceptorResponse--testing */
    axios.interceptors.response.use(response => {
      return response;
   }, error => {

     if (error.response.status === 401) {
  console.error('interceptors.response.use=> Status:',  error.response.status);
  console.error('interceptors.response.use=> Data:',    error.response.data);
  console.error('interceptors.response.use=> Headers:', error.response.headers);
      //place your reentry code

      const errorObject = {'Status': error.response.status, 'Data':error.response.data,'Headers': error.response.headers};
      //return errorObject;
      error=errorObject;
      // eslint-disable-next-line react/react-in-jsx-scope
      //<Redirect to="../components/login" />
      AuthService.logout();
     }
     console.log('errorinINterceptor',error, '401withState', (error && error.Status === 401));
//     return error;
     return Promise.reject(error);
   });

   // let completeHeaders=authHeader();
   // completeHeaders += ","+ customHeader();
   // console.log(completeHeaders);
   // return axios.get(API_URL + 'MainCourses/GetMyMainCoursesWithDetails', { headers: authHeader() });
   return axios.get(API_URL + 'MainCourses/GetMyMainCoursesWithDetails');
    /*
    await axios.get(`https://localhost:8000/email/send`, {
        params: {// whatever data you want to send  },
        headers: {
            'Content-Type': 'application/json',
        }
    })*/

  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'Account/GetAllUsers', { headers: authHeader() });
  }

  getMainCoursesWithDetailsFromUserName(userName) {

    /* probar con INTERCEPTORS  .. ver si despues se deben mover a un common o algo asi...  */

    /*InterceptorRequest=ok*/
    axios.interceptors.request.use(function (config) {
     config.headers = authHeader();
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    /*InterceptorResponse */
    axios.interceptors.response.use(response => {
        return response;
    }, error => {

      if (error.response.status === 401) {
        const errorObject = {'Status': error.response.status, 'Data':error.response.data,'Headers': error.response.headers};
        error=errorObject;
        AuthService.logout();
      }
      return Promise.reject(error);
    });


   return axios.get(API_URL + 'MainCourses/GetMainCoursesWithDetailsFromUserName',
                    {
                        params: { UserName:userName }
                    }
   );


  }

  //Init only get, then you can use interceprot o try to put interceptor in common place to all calls
  getMainCourses() {
    return axios.get(API_URL + 'MainCourses', { headers: authHeader() });
  }

  //  "userEmail": "string",
  //  "newClaimName": "string",
  //  "newClaimValue": "string"

  setCourseToUser(userName, courseClaimName, selectedCourseId) {
    return axios.post(API_URL + 'Account/CreateClaimToUser',
                      { headers: authHeader() },
                      {
                        params: { userEmail:userName, newClaimName: courseClaimName, newClaimValue: selectedCourseId}
                      }

    );
  }

  postCourseToUser(dto: CourseToUser) {
    return axios.post(API_URL + 'Account/CreateClaimToUser', dto,
                      { headers: authHeader() }
    );
  }

}

export default new UserService();
