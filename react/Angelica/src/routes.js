import Index from "screens/Index.jsx";
import Profile from "screens/Login/Profile.jsx";
import Register from "screens/Login/Register.jsx";
import Login from "screens/Login/Auth.jsx";
import ListUser from "screens/User/ListUsers.jsx";
import AddUser from "screens/User/AddUser.jsx";
import EditUser from "screens/User/EditUser.jsx";

import ListMotorista from "screens/Motorista/ListMotorista.jsx";
import AddMotorista from "screens/Motorista/AddMotorista.jsx";
import EditMotorista from "screens/Motorista/EditMotorista.jsx";



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
    path: "/add-user",
    component: AddUser,
    layout: "/admin"
  },
  {
    path: "/edit-user",
    component: EditUser,
    layout: "/admin"
  },
  {
    path: "/add-motorista",
    component: AddMotorista,
    layout: "/admin"
  },
  {
    path: "/edit-motorista",
    component: EditMotorista,
    layout: "/admin"
  },
  {
    path: "/list-motorista",
    name: "Motoristas",
    icon: "ni ni-single-02 text-yellow",
    component: ListMotorista,
    layout: "/admin"
  }
];
export default routes;
