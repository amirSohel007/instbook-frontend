import React, {useEffect, createContext, useReducer, useContext} from "react";
import {useHistory, BrowserRouter as Router } from "react-router-dom";
import {reducer, initialState} from './reducer/reducer'
import { Switch, Route } from "react-router";
import Login from "./components/screens/Login";
import Register from "./components/screens/Register";
import Menu from "./components/screens/Menu";
import Home from "./components/screens/Home";
import "./style/style.scss";


export const UserContext = createContext()
const Routing = () => {
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  const user = JSON.parse(localStorage.getItem('userInfo'))

  useEffect(() => {
    if (user) {
      history.push("/");
      dispatch({ type: "USER", payload: user });
    } else {
      history.push("/signin");
    }
  }, []);

 
  return(
    <switch>
    <Route path="/" exact>
      <Home />
    </Route>
    <Route path="/signin" exact>
      <Login />
    </Route>
    <Route path="/signup" exact>
      <Register />
    </Route>
  </switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
      <UserContext.Provider value={{state, dispatch}}>
      <Router>
        <Menu />
        <Routing />
      </Router>
      </UserContext.Provider>
  );
}

export default App;
