import React, {useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { logout,getCurrentUser } from "../action/authAction";
import { Button } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const Navbar =() => {
var userData = JSON.parse(localStorage.getItem('user'));
const store = useSelector(state => state.users);
const role = store && store.data && store.data.user && store.data.user.role ? store.data.user.role :null;
const dispatch = useDispatch();
useEffect(() => {
    dispatch(getCurrentUser(userData));
  }, [dispatch]);

const history = useHistory();

const handleLogout = () => {
    dispatch(logout()).then(()=>{
        history.push(`/auth`)
    });
}
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <div className="collapse navbar-collapse">
                {store && store.data && store.data.token ? 
                       (<ul className="navbar-nav">
                            {/* <li className="navbar-item">
                                <Link to="/formlist" className="nav-link">List</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/formcreate" className="nav-link">Create Form</Link>
                            </li> 
                            <li className="navbar-item">
                                <Link to="/user" className="nav-link">Create User</Link>
                            </li>*/}
                            <li className={`navbar-item ${role !== "admin" ? 'd-none':''}`}>
                                <Link to="/category/list" className="nav-link">Category</Link>
                            </li>
                            <li className={`navbar-item ${role !== "admin" ? 'd-none':''}`}>
                                <Link to="/product/list" className="nav-link">Product</Link>
                            </li>
                            <li className="navbar-item" /*hidden={role==='admin'?false:true}*/>
                                <Link to="/order/list" className="nav-link">Order</Link>
                            </li>
                            <li className={`navbar-item ${role !== "admin" ? 'd-none':''}`}>
                                <Link to="/user/list" className="nav-link">User</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to={`#`} onClick={()=>{handleLogout()}} className="nav-link">Logout</Link>
                            </li>
                        </ul>):
                        <ul className="navbar-nav">
                            <li className="navbar-item">
                                <Link to="/auth" className="nav-link">Login</Link>
                            </li>
                        </ul>
                    }
                </div>
            </nav>
        );
    }

export default Navbar;