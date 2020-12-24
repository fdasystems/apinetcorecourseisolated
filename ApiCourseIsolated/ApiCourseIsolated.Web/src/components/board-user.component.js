import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import ExpandMenuItem from "./expand-menu-item.js";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      loading: true,
      unauthorizedToken: false
    };

  }

  async componentDidMount() {     await
  //useEffect(() => {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data,
          loading: false
        });
      },
      error => {
        if (error) console.log('error',error);
        if (error && error.Status) console.log('error.Status',error.Status);

        this.setState({
          unauthorizedToken: (error && error.Status && error.Status === 401),
          loading: false,
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }
 //,[]);

 componentDidUpdate(){
  //const { navigate,goBack } = this.props.navigation;
 // const { currentUser } = this.state;


      if (!AuthService.getCurrentUser()) {
        //test this or undefined
        this.setState({
          currentUser: undefined
        });
      }
  }

  render() {

//const { currentUser } = this.state;

    const dataToExpandLoad = this.state.content; //this.state.content
    const dataLoading = this.state.loading;
    const unauthorizedToken = this.state.unauthorizedToken;
    const user = AuthService.getCurrentUser();

    /* full ok but message is not equal*/
    if ((dataToExpandLoad === null || dataToExpandLoad === undefined)
        ||
       //(dataToExpandLoad !== null  && dataToExpandLoad.length===0) orig
       (dataToExpandLoad !== null  && dataToExpandLoad.length===0 && dataLoading) //added loading control
       )

 //if (dataToExpandLoad === null || dataToExpandLoad === undefined)  //solo no funca
    {
      console.log('dataToExpandLoad in null case=> ',dataToExpandLoad);
      // Render loading state …
      return (
        <React.Fragment>
        ..::Cargando sus videos de cursos adquiridos::..
        </React.Fragment>
    );
      } else {

        //2nd check
        if (!user)
        {
          console.log('!user',user);

          return <Redirect to="/login" />
        }


      // Render real UI …
        return (
            <React.Fragment>
              {console.log('dataToExpandLoad'+dataToExpandLoad)}
            <div className="container">
              <header className="jumbotron">
              <ExpandMenuItem dataToExpand={dataToExpandLoad} />
              </header>
            </div>
            </React.Fragment>
        );
      }




  }
}
