import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import { FcGoogle } from "react-icons/fc";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import auth from "../../../Firebase/firebase.init";

const Login = () => {
  const [changeEmailBorderColor, handleEmailBorderColor] = useState(false);
  const [changePassBorderColor, handlePassBorderColor] = useState(false);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const [errors, setError] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleEmail = (e) => {
    const verifyEmail = /\S+@\S+\.\S+/.test(e.target.value);
    if (verifyEmail) {
      handleEmailBorderColor(false);
      setInfo({ ...info, email: e.target.value });
      setError({ ...errors, email: "" });
    } else {
      handleEmailBorderColor(true);
      setError({ ...errors, email: "Invalid email" });
      setInfo({ ...info, email: "" });
    }
  };
  const handlePassword = (e) => {
    const verifyPassword = /(?=.*?[#?!@$%^&*-]).{6,}/.test(e.target.value);
    const passLength = /.{6,}/.test(e.target.value);
    if (verifyPassword) {
      handlePassBorderColor(false);
      setInfo({ ...info, password: e.target.value });
      setError({ ...errors, password: "" });
    } else {
      if (!passLength) {
        handlePassBorderColor(true);
        setError({
          ...errors,
          password: "Minimum 6 characters",
        });
        setInfo({ ...info, password: "" });
      } else {
        handlePassBorderColor(true);
        setError({
          ...errors,
          password: "Minimum 1 special character",
        });
        setInfo({ ...info, password: "" });
      }
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(info.email, info.password);
  };
  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };
  if (user || googleUser) {
    navigate(from, { replace: true });
  }
  return (
    <div className="">
      <div className="mx-auto col-sm-6 col-lg-4 px-5 mt-5">
        <h3 className="text-center my-3">Login</h3>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-2">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              onChange={handleEmail}
              style={Object.assign(
                {},
                {
                  borderColor: changeEmailBorderColor ? "red" : "",
                  borderWidth: changeEmailBorderColor ? "2px" : "1px",
                }
              )}
              className="form-control shadow-none"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            {errors?.email && (
              <p className="text-danger ">
                <AiOutlineExclamationCircle className="me-1" />
                {errors.email}
              </p>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              style={Object.assign(
                {},
                {
                  borderColor: changePassBorderColor ? "red" : "",
                  borderWidth: changePassBorderColor ? "2px" : "1px",
                }
              )}
              onChange={handlePassword}
              className="form-control shadow-none"
              id="exampleInputPassword1"
              placeholder="Password"
            />
            {errors?.password && (
              <p className="text-danger ">
                <AiOutlineExclamationCircle className="me-1" />
                {errors.password}
              </p>
            )}
          </div>
          <div>
            <b className="forgotPass">Forgot your password?</b>
          </div>
          <div className="mt-4">
            <p>
              Don't have an account
              <Link to="/signup"> Sign Up</Link>
            </p>
          </div>

          <button
            type="submit"
            className="btn btn-outline-primary rounded-pill w-100"
          >
            Login
          </button>

          <div className="mt-3 d-flex align-items-center">
            <div
              style={{
                display: "inline",
                width: "50%",
                borderBottom: "1px solid gray",
              }}
            ></div>
            <span className="px-2 pb-1">or</span>
            <div
              style={{
                display: "inline",
                width: "50%",
                borderBottom: "1px solid gray",
              }}
            ></div>
          </div>
          <button
            type="submit"
            className="btn btn-outline-dark rounded-pill w-100 mt-3"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="fs-5 "></FcGoogle> <b>Continue with Google</b>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
