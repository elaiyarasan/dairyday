import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Navbar from "./components/Navbar.js";
import CreateUser from "./components/CreateUser";
import OtpReg from './components/OtpReg';
import FormCreate from './components/crudOpe/FormCreate';
import FormList from './components/crudOpe/FormList';
import FormEdit from './components/crudOpe/FormEdit';
import Auth from './components/auth/auth.js';
import categoryList from './components/category/categoryList'
import categoryEdit from './components/category/categoryEdit'
import productEdit from './components/product/productEdit'
import productList from './components/product/productList'
import OrderList from './components/order/orderList'
import OrderEdit from './components/order/orderEdit'
import OrderView from './components/order/orderView'
import userList from './components/user/userList'
import userEdit from './components/user/userEdit'
const App = () =>{
  return (
    <BrowserRouter>
      <Navbar />
      <br />
      {/* <Route path="/otp/:phone" component={OtpReg} /> */}
      {/* <Route path="/user" component={CreateUser} /> */}
      <Route path="/formcreate" component={FormCreate} />
      <Route path="/formlist" component={FormList} />
      <Route path="/formedit/:id" component={FormEdit} />
      <Route path="/formedit/:id" component={FormEdit} />
      <Route path="/category/list" component={categoryList} />
      <Route path="/category/add" component={categoryEdit} />
      <Route path="/product/add" component={productEdit} />
      <Route path="/product/list" component={productList} />
      <Route path="/order/list" component={OrderList} />
      <Route path="/order/add" component={OrderEdit} />
      <Route path="/order/view/:id" component={OrderView} />
      <Route path="/user/list" component={userList} />
      <Route path="/user/add" component={userEdit} />
      <Route path="/auth" component={Auth} />
      
    </BrowserRouter>
  );
}

export default App;
