import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import PostModal from './Post-Modal'
import {UserContext} from '../../App'
import UnauthorizedLink from './UnauthorizedLink'
import AuthorizedLink from './AuthorizedLink'


const Menu = () => {
  const {state, dispatch} = useContext(UserContext)
  const [show, setShow] = useState(false)

	const openModal =() => setShow(true)
  const updateValue = (val) => setShow(val)

  return (
    <header>
      <Layout>
        <nav className="navbar navbar-expand-lg p-0">
          <Link className="navbar-brand" to="/">
            <img
              style={{ width: "128px" }}
              className=""
              src="../../img/logo.png"
              alt="logo"
            />
          </Link>
          <ul className="navbar-nav ml-auto">
            
            <li className="nav-item">
              <UnauthorizedLink className="nav-link" to="/signin">Login In</UnauthorizedLink>
            </li>
            <li className="nav-item">
              <UnauthorizedLink className="nav-link" to="/signup"> Sign In</UnauthorizedLink>
            </li>
          
            <li className="nav-item user-menu">
              <AuthorizedLink className="nav-link" onClick={openModal}>Add Post</AuthorizedLink>
            </li>
            <li className="nav-item user-menu">
              <AuthorizedLink className="nav-link">Profile</AuthorizedLink>
            </li>

          </ul>
        </nav>  
      </Layout>
      <PostModal show={show} closeModal={updateValue}/>
    </header>
  );
};

export default Menu;
