import VideoToCourse from './types/VideoToCourse.ts';
import ServiceBase from './serviceBase';

const API_URL = process.env.REACT_APP_BACKEND_API;

class CourseService extends ServiceBase {

  getMainCourses() {
    return this.getSimple(API_URL + 'MainCourses');
  }
  getSimpleDetailsFromMainCourse(id)
  {
    return this.getSimple(API_URL + `DetailCourses/GetLinksDetailCourseFromMain/${id}`);
  }
  getMainCoursesWithDetailsFromUserName(userName) {
    return this.getWithParams(API_URL + 'MainCourses/GetMainCoursesWithDetailsFromUserName',
                  {
                      params: { UserName:userName }
                  }
    );
  }
  postVideoToCourse(dto: VideoToCourse) {
    return this.postWithBody(API_URL + 'DetailCourses', dto);
  }

  registerCourse(name, levelRequired) {
    //TODO: then create dto Object
    return this.postWithBody(API_URL + "MainCourses",
                      {
                        name,
                        levelRequired
                      })
  }

  postDeleteVideoFromCourse(id) {
    return this.deleteSimple(API_URL + `DetailCourses/${id}`);
  }

  postDeleteCourse(id) {
    return this.deleteSimple(API_URL + `MainCourses/${id}`);
  }
}

export default new CourseService();
