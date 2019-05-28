import Index from "screens/Index.jsx";
import Profile from "screens/Login/Profile.jsx";
import Register from "screens/Login/Register.jsx";
import Login from "screens/Login/Auth.jsx";
import ListUser from "screens/User/ListUsers.jsx";
import AddUser from "screens/User/AddUser.jsx";
import EditUser from "screens/User/EditUser.jsx";

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
  }
];
export default routes;
