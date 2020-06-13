import React, { useState } from "react";
import Layout from "./Layout";
import { NavLink } from "react-router-dom";
import { register } from "../../API-Calls/Data-provider";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [isRegister, registerStatus] = useState(false);
  const [isError, setError] = useState("");

  async function formSubmit(e) {
    setProcessing(true);
    const userRegister = await register(e, name, email, password);
    if (userRegister.error) {
      setError(userRegister.error);
      setProcessing(false);
    } else {
      registerStatus(true);
      setProcessing(false);
    }
  }

  return (
    <Layout>
      <div className="row justify-content-center">
        <div className="col-sm-5 pt-5">
          <img className="mobile" src="../../img/insta-snap.png" />
        </div>
        <div className="col-sm-4">
          <div className="bg-white form-wrapper mt-5 p-4 border-radius-4">
            <form>
              <div className="form-group text-center">
              <h5 className="logo">InstaBook</h5>
              </div>
              <div className="form-group">
                <label htmlFor="">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="user"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Email/Id</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
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
                onClick={formSubmit}
              >
                {processing ? "Processing...." : "Sign Up"}
              </button>
              <p className="mb-0 text-13 text-center">
                Already have account ?{" "}
                <NavLink className="primary-text" to="/signin">
                  Login
                </NavLink>
              </p>
              {isRegister && (
                <div
                  className="alert alert-success mt-3 text-12 text-center"
                  role="alert"
                >
                  Your account is created. Please{" "}
                  <NavLink className="primary-text" to="/signin">
                    Login
                  </NavLink>
                </div>
              )}
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

export default Register;
