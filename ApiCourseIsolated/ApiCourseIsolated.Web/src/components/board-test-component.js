import React from "react";
import "../styles/sidebar.css";
import ExpandMenuItem from "./expand-menu-item.js";

export default function App() {
  const menuData = [
    {
      id: 1,
      name: "test 1",
      children: [
        { id: 5, name: "test 5", children: [] },
        {
          id: 6,
          name: "test 6",
          children: [
            { id: 7, name: "test 7", children: [] },
            { id: 8, name: "test 8", children: [] }
          ]
        }
      ]
    },
    { id: 2, name: "test 2", children: [] }
  ];


const menuData2 =[{name:"COLORMETRÍA BÁSICA",levelRequired:"1",details:[{urlLink:"https://youtu.be/0w3c-YJUhmQ",order:"1",description:"Inicial",mainCourseId:"1",id:"2"}],id:"1"}];
const menuData3 =[{name:"COLORMETRÍA BÁSICA",levelRequired:1,details:[{urlLink:"https://youtu.be/0w3c-YJUhmQ",order:1,description:"Inicial",mainCourseId:1,id:2}],id:1}];
const menuData4 =[{"name":"COLORMETRÍA BÁSICA","levelRequired":1,"details":[{"urlLink":"https://youtu.be/0w3c-YJUhmQ","order":1,"description":"Inicial","mainCourseId":1,"id":2}],"id":1}];
const menuEspejoProd=[{"name":"COLORMETRÍA BÁSICA","levelRequired":1,"details":[{"urlLink":"https://youtu.be/0w3c-YJUhmQ","order":1,"description":"Inicial","mainCourseId":1,"id":2}],"id":1}];
  return (
    <div className="App">
      <ExpandMenuItem dataToExpand={menuEspejoProd} />
    </div>
  );
}
