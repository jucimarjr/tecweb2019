import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.jsx";
import AuthLayout from "layouts/Login.jsx";
<<<<<<< HEAD
import TaxiLayout from "layouts/Taxi.jsx";

=======
import AdminLayout from "layouts/Admin.jsx";
>>>>>>> e2be0766dee8ec95722113a7ac552e7483c601d6

ReactDOM.render(
  <BrowserRouter>
    <Switch>
<<<<<<< HEAD
      <Route path="/admin" render={props => <AdminLayout {...props} />} /> 
      <Route path="/taxi" render={props => <TaxiLayout {...props} />} /> 

      {/*<Route path="/login" render={props => <AuthLayout {...props} />} /> */}
      <Redirect from="/" to="/admin/index" />
=======
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/login" render={props => <AuthLayout {...props} />} />
      {//<Redirect from="/" to="/login/auth" />
      }
>>>>>>> e2be0766dee8ec95722113a7ac552e7483c601d6
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
