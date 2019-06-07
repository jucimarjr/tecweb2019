import Index from "screens/Index.jsx";
import Profile from "screens/Login/Profile.jsx";
import Register from "screens/Login/Register.jsx";
import Login from "screens/Login/Auth.jsx";
import ListUsers from "screens/User/ListUsers.jsx";
import AddUser from "screens/User/AddUser.jsx";
import EditUser from "screens/User/EditUser.jsx";
import AddTaxi from "screens/Taxi/AddTaxi.jsx";
import ListTaxi from "screens/Taxi/ListTaxi.jsx";
import EditTaxi from "screens/Taxi/EditTaxi.jsx";
import ListMotorista from "screens/Motorista/ListMotorista.jsx";
import AddMotorista from "screens/Motorista/AddMotorista.jsx";
import EditMotorista from "screens/Motorista/EditMotorista.jsx";
import ListPermissoes from "screens/Permissoes/ListPermissoes.jsx";
import EditPermissoes from "screens/Permissoes/EditPermissoes.jsx";
import AddPermission from "screens/Permissoes/AddPermission.jsx";

import Search from "screens/Placa/Search.jsx";
import SearchResult from "screens/Placa/SearchResult.jsx";
 


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
    component: ListUsers,
    layout: "/user"
  }, 
  {
    path: "/edit-user",
    component: EditUser,
    layout: "/user"
  },
  {
    path: "/add-user",
    component: AddUser,
    layout: "/user"
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
    path: "/edit-taxi",
    name: "Táxi",
    icon: "ni ni-circle-08 text-pink",
    component: EditTaxi,
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
  {
    path: "/add-motorista",
    name: "Motorista",
    icon: "ni ni-circle-08 text-pink",
    component: AddMotorista,
    layout: "/motorista"
  },
  {
    path: "/edit-motorista",
    name: "Motorista",
    icon: "ni ni-circle-08 text-pink",
    component: EditMotorista,
    layout: "/motorista"
  },
  {
    path: "/search",
    name: "User",
    icon: "ni ni-circle-08 text-pink",
    component: Search,
    layout: "/placa"
  },
  {
    path: "/search-result",
    name: "User",
    icon: "ni ni-circle-08 text-pink",
    component: SearchResult,
    layout: "/placa"
  },
  {
    path: "/list-permissions",
    name: "Permissoes",
    icon: "ni ni-circle-08 text-pink",
    component: ListPermissoes,
    layout: "/permissoes"
  },
  {
    path: "/edit-permissoes",
    name: "Permissoes",
    icon: "ni ni-circle-08 text-pink",
    component: EditPermissoes,
    layout: "/permissoes"
  },
  {
    path: "/add-permission",
    name: "Permissoes",
    icon: "ni ni-circle-08 text-pink",
    component: AddPermission,
    layout: "/permissoes"
  }
 
];
export default routes;
