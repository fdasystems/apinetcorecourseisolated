import axios from 'axios';
import CourseToUser from './types/CourseToUser.ts';
import ServiceBase from './serviceBase';

const API_URL = process.env.REACT_APP_BACKEND_API;

class UserService extends ServiceBase {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
   return this.getSimple(API_URL + 'MainCourses/GetMyMainCoursesWithDetails');
  }

  getAdminBoard() {
    return this.getSimple(API_URL + 'Account/GetAllUsers');
  }



  postCourseToUser(dto: CourseToUser) {
    return this.postWithBody(API_URL + 'Account/CreateClaimToUser', dto);
  }
}

export default new UserService();
