import axios from 'axios';
import authHeader from './auth-header';
import AuthService from "./auth.service";
import VideoToCourse from './types/VideoToCourse.ts';
//no iria... import React from 'react';
//no iria... import ReactDOM from 'react-dom';


//const API_URL = 'https://localhost:44394/api/';
const API_URL = "http://apicourseisolated.azurewebsites.net/api/";

class CourseService {
  //Init only get, then you can use interceprot o try to put interceptor in common place to all calls
  getMainCourses() {
    return axios.get(API_URL + 'MainCourses', { headers: authHeader() });
  }

  getSimpleDetailsFromMainCourse(id) {
    return axios.get(API_URL + 'MainCourses/MainCoursesWithDetails', // id,
                      { headers: authHeader() }
    );
  }

  postVideoToCourse(dto: VideoToCourse) {
    return axios.post(API_URL + 'DetailCourses/CreateDetailCourse', dto,
                      { headers: authHeader() }
    );
  }

  registerCourse(name, levelRequired) {
    //TODO: then create dto Object
    return axios.post(API_URL + "MainCourses",
                      {
                        name,
                        levelRequired
                      },
                      { headers: authHeader() }
    );
  }

}

export default new CourseService();
