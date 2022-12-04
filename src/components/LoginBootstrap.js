import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import app from "../firebase/firebase.init";

const auth = getAuth(app);

const LoginBootstrap = () => {
  const [success, setSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccess(false);

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess(true);
      })
      .catch((error) => {
        console.error("error", error);
        setPasswordError(error.message)
      });
  };

  const handleEmailBlur = event => {
    const email = event.target.value
    setUserEmail(email)
    console.log(email);
  }

  const handleForgetPassword = () => {
    if (!userEmail) {
      alert('Please provide your email address.')
    }
    sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        alert('Password email sent. Please check your email.')
      })
      .catch(error => {
        console.error(error.message)
      })
  };

  return (
    <div className="w-50 mx-auto">
      <h3 className="text-success">Please Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Email Adress
          </label>
          <input onBlur={handleEmailBlur}
            type="email"
            name="email"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Enter your password"
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
      <p className='text-danger'>{passwordError}</p>
      {success && <p>Successfully login to the account</p>}
      <p>
        <small>
          New to this website? Please <Link to="/register">Register</Link>
        </small>
      </p>
      <p>
        <small> Forget Password?
          <button
            type="button"
            onClick={handleForgetPassword}
            className="btn btn-link"
          >
            Reset Password
          </button></small>
      </p>
    </div>
  );
};

export default LoginBootstrap;
