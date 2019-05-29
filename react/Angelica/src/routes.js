import Index from "screens/Index.jsx";
import Profile from "screens/Login/Profile.jsx";
import Register from "screens/Login/Register.jsx";
import Login from "screens/Login/Auth.jsx";
import List from "screens/Taxi/List.jsx";
import AddTaxi from "screens/Taxi/AddTaxi.jsx";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/auth",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/login"
  },
  {
    path: "/list",
    name: "Táxi",
    icon: "ni ni-circle-08 text-pink",
    component: List,
    layout: "/taxi"
   
  },
  {
    path: "/addTaxi",
    name: "Adicionar",
    icon: "ni ni-circle-08 text-pink",
    component: AddTaxi,
    layout: "/taxi"
   
  },
 
];
export default routes;
