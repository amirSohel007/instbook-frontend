import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Layout from "./Layout";
import PostModal from './Post-Modal'
import { UserContext } from '../../App'
import UnauthorizedLink from './UnauthorizedLink'
import AuthorizedLink from './AuthorizedLink'
import { findUser } from '../../API-Calls/Data-provider'
import Spinner from 'react-bootstrap/Spinner'


const Menu = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  const [show, setShow] = useState(false)
  const [search, setSearch] = useState([])
  const [isloading, setLoading] = useState()
  const isAdministrator = '5edf5ddc0b47dc117f301ee5'

  const openModal = () => setShow(true)
  const updateValue = (val) => setShow(val)
  const signOut = () => {
    history.push('/signin')
    localStorage.clear()
    dispatch({ type: 'CLEAR' })
  }

  const searchUser = async (key) => {
    setLoading(true);
    const searchUsers = await findUser(key);
    if (searchUser) {
      setSearch(searchUsers);
      setLoading(false);
      if (document.querySelector(".search input").value == "") {
        setSearch(false);
      }
    }
  };

  return (
    <header>
      <Layout>
        <nav className="navbar navbar-expand-lg p-0">
          <Link className="navbar-brand" to={state ? "/" : "/signin"}>
            <img src="../../img/official.png"/>
          </Link>

          {state && state._id &&
            <div className="search position-relative">
              <input className="amir" type="text" placeholder="search.." onChange={(e) => searchUser(e.target.value)} />
              {isloading ? <Spinner animation="border" size="sm" /> : ''}
              {search && search.length > 0 &&
                <ul className="search-result m-0 p-0 list-unstyled">
                  {search && search.map(item => {
                    return (
                      <a key={item._id} href={`/user/${item._id}`} className="text-body">
                        <li className="d-flex">
                          <img src={item.profileImg} />
                          <div>
                            <h3>{item.name} {isAdministrator == item._id ? <img className="official-icon" src="../../img/official.png" /> : ''}</h3>
                            <p>{item.email}</p>
                          </div>
                        </li>
                      </a>
                    )
                  })}
                </ul>}
            </div>
          }
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
                <Link className="nav-link" to="/">
                  Feeds
                </Link>
              </AuthorizedLink>
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
                <a className="nav-link" href={`/user/${state && state._id}`}>
                  Profile
                </a>
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
