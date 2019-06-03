import Index from "screens/Index.jsx";
import Profile from "screens/Login/Profile.jsx";
import Register from "screens/Login/Register.jsx";
import Login from "screens/Login/Auth.jsx";
import ListUser from "screens/User/ListUsers.jsx";
import AddUser from "screens/User/AddUser.jsx";
import EditUser from "screens/User/EditUser.jsx";
import AddTaxi from "screens/Taxi/AddTaxi.jsx";
import ListTaxi from "screens/Taxi/ListTaxi.jsx";
import ListMotorista from "screens/Motorista/ListMotorista.jsx";
import AddMotorista from "screens/Motorista/AddMotorista.jsx";
import EditMotorista from "screens/Motorista/EditMotorista.jsx";

import Search from "screens/User/Search.jsx";



var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/list-user",
    name: "Usuários",
    icon: "ni ni-single-02 text-yellow",
    component: ListUser,
    layout: "/admin"
  }, 
  {
    path: "/edit-user",
    component: EditUser,
    layout: "/admin"
  },
  {
    path: "/add-user",
    component: AddUser,
    layout: "/admin"
  },
  {
    path: "/register",
    name: "Registrar",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/login"
  },
  {
    path: "/auth",
    name: "Logout",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/login"
  },
  {
    path: "/list-taxi",
    name: "Táxi",
    icon: "ni ni-circle-08 text-pink",
    component: ListTaxi,
    layout: "/taxi"
   
  },
  {
    path: "/addTaxi",
    name: "Adicionar",
    icon: "ni ni-circle-08 text-pink",
    component: AddTaxi,
    layout: "/taxi"
   
  },
  {
    path: "/search",
    name: "Search",
    icon: "ni ni-circle-08 text-pink",
    component: Search,
    layout: "/admin"
  },
  {
    path: "/list-motorista",
    name: "Motorista",
    icon: "ni ni-circle-08 text-pink",
    component: ListMotorista,
    layout: "/motorista"
  },
 
];
export default routes;
