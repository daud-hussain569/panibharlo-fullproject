import * as React from "react";
import { Admin, Resource } from "react-admin";

import dataProvider from "./api/dataProvider";
import authProvider from "./api/authProvider";

import Users from "./pages/Users";
import Products from "./pages/Products";
import BottleOrders from "./pages/BottleOrders";
import TankerOrders from "./pages/TankerOrders";
import Testimonials from "./pages/Testimonials";
import Dashboard from "./pages/Admin/Dashboard"

function App() {
  return (
    <Admin  dashboard={Dashboard} dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="users" {...Users} />
      <Resource name="products" {...Products} />
      <Resource name="bottle-Orders" {...BottleOrders} />
      <Resource name="tanker-Orders" {...TankerOrders} />
      <Resource name="testimonials" {...Testimonials} />
    </Admin>
  );
}

export default App;
