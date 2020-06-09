import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Layout from "./Layout";
import PostModal from './Post-Modal'
import {UserContext} from '../../App'
import UnauthorizedLink from './UnauthorizedLink'
import AuthorizedLink from './AuthorizedLink'


const Menu = () => {
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  const [show, setShow] = useState(false)

	const openModal =() => setShow(true)
  const updateValue = (val) => setShow(val)
  const signOut = () => {
    history.push('/signin')
    localStorage.clear()
    dispatch({type:'CLEAR'})
   
  }

  return (
    <header>
      <Layout>
        <nav className="navbar navbar-expand-lg p-0">
          <Link className="navbar-brand" to={state ? "/" : "/signin"}>
            <img
              style={{ width: "128px" }}
              className=""
              src="../../img/logo.png"
              alt="logo"
            />
          </Link>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <UnauthorizedLink className="nav-link" to="/signin">
                Login In
              </UnauthorizedLink>
            </li>
            <li className="nav-item">
              <UnauthorizedLink className="nav-link" to="/signup">
                {" "}
                Sign Up
              </UnauthorizedLink>
            </li>

            <li className="nav-item user-menu">
              <AuthorizedLink>
                <button className="nav-link" onClick={openModal}>
                  Add Post
                  </button>
              </AuthorizedLink>
            </li>
            <li className="nav-item user-menu">
              <AuthorizedLink>
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </AuthorizedLink>
            </li>
            <li className="nav-item user-menu">
              <AuthorizedLink>
                <button className="nav-link" onClick={signOut}>Sign Out</button>
              </AuthorizedLink>
            </li>
          </ul>
        </nav>
      </Layout>
      <PostModal show={show} closeModal={updateValue} />
    </header>
  );
};

export default Menu;
