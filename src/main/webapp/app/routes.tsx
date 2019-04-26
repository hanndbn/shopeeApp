import React from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";

import Login from "app/modules/login/login";
import Register from "app/modules/account/register/register";
import Activate from "app/modules/account/activate/activate";
import PasswordResetInit from "app/modules/account/password-reset/init/password-reset-init";
import PasswordResetFinish from "app/modules/account/password-reset/finish/password-reset-finish";
import Logout from "app/modules/login/logout";
import Home from "app/modules/home/home";
import Entities from "app/entities";
import PrivateRoute from "app/shared/auth/private-route";
import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";
import { AUTHORITIES } from "app/config/constants";
import Carousel from "app/modules/carousel/carousel";
import MedicineHome from "app/modules/medicine/Home/medicineHome";
import ItemDetail from "app/modules/medicine/ItemDetail/itemDetail";
import TuvanHome from "app/modules/tuvan/home/tuvanHome";
import BanhangHome from "app/modules/banhang/home/banhangHome";

// tslint:disable:space-in-parens
const Account = Loadable({
  loader: () => import(/* webpackChunkName: "account" */ "app/modules/account"),
  loading: () => <div>loading ...</div>
});

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ "app/modules/administration"),
  loading: () => <div>loading ...</div>
});
// tslint:enable

const Routes = () => (
  <div className="view-routes">
    <ErrorBoundaryRoute path="/login" component={Login} />
    <Switch>
      <ErrorBoundaryRoute exact path="/" component={Home} />
      <Route
        path="/medicine"
        render={({ match: { url } }) => (
          <>
            <Route path={`${url}/`} component={Carousel} exact />
            <Route path={`${url}/home`} component={MedicineHome} />
            <Route path={`${url}/item-detail`} component={ItemDetail} />
          </>
        )}
      />
      <Route
        path="/tu-van"
        render={({ match: { url } }) => (
          <>
            <Route path={`${url}/`} component={TuvanHome} exact />
            <Route path={`${url}/home`} component={MedicineHome} />
            <Route path={`${url}/item-detail`} component={ItemDetail} />
          </>
        )}
      />
      <Route
        path="/ban-hang"
        render={({ match: { url } }) => (
          <>
            <Route path={`${url}/`} component={BanhangHome} exact />
            <Route path={`${url}/home`} component={MedicineHome} />
            <Route path={`${url}/item-detail`} component={ItemDetail} />
          </>
        )}
      />
      <ErrorBoundaryRoute path="/logout" component={Logout} />
      <ErrorBoundaryRoute path="/register" component={Register} />
      <ErrorBoundaryRoute path="/activate/:key?" component={Activate} />
      <ErrorBoundaryRoute path="/reset/request" component={PasswordResetInit} />
      <ErrorBoundaryRoute path="/reset/finish/:key?" component={PasswordResetFinish} />
      <PrivateRoute path="/admin" component={Admin} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <PrivateRoute path="/account" component={Account} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />
      <PrivateRoute path="/entity" component={Entities} hasAnyAuthorities={[AUTHORITIES.USER]} />
    </Switch>
  </div>
);

export default Routes;
