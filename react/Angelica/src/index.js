import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.jsx";
import AuthLayout from "layouts/Login.jsx";
import TaxiLayout from "layouts/Taxi.jsx";
import UserLayout from "layouts/User.jsx";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} /> 
      <Route path="/taxi" render={props => <TaxiLayout {...props} />} /> 
      <Route path="/login" render={props => <AuthLayout {...props} />} />
      <Route path="/user" render={props => <UserLayout {...props} />} />

      {/*<Route path="/login" render={props => <AuthLayout {...props} />} /> */}
      <Redirect from="/" to="/admin/index" />

    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
