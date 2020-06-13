import React, { useState, useContext } from "react";
import Layout from "./Layout";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {UserContext} from '../../App'
import {login} from '../../API-Calls/Data-provider'

const Login = () => {
  const {state, dispatch} = useContext(UserContext) 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [isError, setError] = useState("");
  const history = useHistory();

  async function postSignIn(e) {
    setProcessing(true);
    const userLogin = await login(e, email, password);
    if (userLogin.error) {
      setError(userLogin.error);
      setProcessing(false);
    } else {
      const { token, email, name, _id } = userLogin;
      localStorage.setItem("authToken", token);
      const user = { email, name, _id };
      localStorage.setItem("userInfo", JSON.stringify(user));
      dispatch({ type: "USER", payload: user });
      setProcessing(false);
      history.push("/");
    }
  }

  return (
    <Layout>
      <div className="row justify-content-center">
        <div className="col-sm-5 pt-5">
          <img className="mobile" src="../../img/insta-snap.png" />
        </div>

        <div className="col-sm-5">
          <div className="bg-white form-wrapper mt-5 p-4 border-radius-4">
            <form>
              <div className="form-group text-center">
              <h5 className="logo">InstaBook</h5>
              </div>
              <div className="form-group">
                <label htmlFor="">Email/Id</label>
                <input
                  type="text"
                  className="form-control"
                  id="user-id"
                  placeholder="Email-id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 mb-3"
                disabled={processing}
                onClick={postSignIn}
              >
                {processing ? "Processing...." : "Sign In"}
              </button>

              <p className="mb-0 text-13 text-center">
                No account ?{" "}
                <NavLink className="primary-text" to="/signup">
                  Create one
                </NavLink>
              </p>
              {isError && (
                <div
                  className="alert alert-danger mt-3 text-12 text-center"
                  role="alert"
                >
                  {isError}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
