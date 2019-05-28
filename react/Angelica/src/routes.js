import Index from "screens/Index.jsx";
import Profile from "screens/Login/Profile.jsx";
import Register from "screens/Login/Register.jsx";
import Login from "screens/Login/Auth.jsx";
import Taxi from "screens/Taxi/AddTaxi.jsx";

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
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/login"
  },
  {
    path: "/add-taxi",
    name: "Taxi",
    icon: "ni ni-key-25 text-info",
    component: Taxi,
    layout: "/taxi"
  }
];
export default routes;
