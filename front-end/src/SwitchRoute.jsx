import React from "react";
// rfce

import { Route, Router, Switch } from "react-router-dom";

import History from "./utils/history";

import Home from "./pages/Home/Index.jsx";
import ProductDetail from "./pages/ProductDetail/Index.jsx";
import Card from "./pages/Cart/Index.jsx";
import Search from "./pages/Search/Index.jsx";
import Payment from "./pages/Payment/Index.jsx";
import Login from "./pages/Login/Index.jsx";
import Register from "./pages/Register/Index.jsx";
import ForgotPassword from "./pages/ForgotPassword/Index.jsx";
import Profile from "./pages/Profile/HomeProfile/Index.jsx";
import OrderSuccess from "./pages/OrderSuccess/Index.jsx";

// lib admin
import LoginAdmin from "./pages/Admin/LoginAdmin/Index.jsx";
import Dashboard from "./pages/Admin/Dashboard/Index.jsx";
import ManagerProduct from "./pages/Admin/ManagerProducts/Index.jsx";
import ManagerUser from "./pages/Admin/ManagerUser/Index.jsx";
import ManagerOrderHistories from "./pages/Admin/ManagerOrderHistories/Index.jsx";
import EditProduct from "./pages/Admin/EditProduct/Index.jsx";

function SwitchRoute() {
  return (
    <Router history={History}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetail} />
        <Route exact path="/cart" component={Card} />
        <Route exact path="/category/:name" component={Search} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/order-success" component={OrderSuccess} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/profile" component={Profile} />

        {/* --------- AreAdmin -------------- */}

        <Route exact path="/area-admin/login" component={LoginAdmin} />
        <Route exact path="/area-admin/dashboard" component={Dashboard} />
        <Route
          exact
          path="/area-admin/manager-product"
          component={ManagerProduct}
        />
        <Route exact path="/area-admin/manager-user" component={ManagerUser} />
        <Route
          exact
          path="/area-admin/manager-order"
          component={ManagerOrderHistories}
        />
        <Route
          exact
          path="/area-admin/manager-product/edit-product/:id"
          component={EditProduct}
        />
      </Switch>
    </Router>
  );
}

export default SwitchRoute;
