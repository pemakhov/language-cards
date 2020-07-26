import React, { useState } from "react";
import "./Login.scss";

export interface ILoginProps {}

export const Login = () => {
  const [emailError, updateEmailError] = useState("");
  const [passwordError, updatePasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: React.ChangeEvent) => {
    updateEmailError("");
    const target = event.currentTarget as HTMLInputElement;
    setEmail(target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent) => {
    updatePasswordError("");
    const target = event.currentTarget as HTMLInputElement;
    setPassword(target.value);
  };

  const validateEmail = () => {
    const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;
    const wrongEmailMessage = "Please, provide a valid email address";
    const error = emailPattern.test(email) ? "" : wrongEmailMessage;
    updateEmailError(error);
  };

  const validatePassword = () => {
    let wrongPasswordMessage = "";
    if (password.length < 8) {
      wrongPasswordMessage = "Should be at least 8 characters";
    } else if (!/\d/.test(password)) {
      wrongPasswordMessage = "Should contain at least one digit";
    } else if (!/[a-zA-Z]/.test(password)) {
      wrongPasswordMessage = "Should contain at least one letter";
    }
    updatePasswordError(wrongPasswordMessage);
  };

  const requestToken = () => {
    console.log('sending request')
    const data = { email, password };
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/users/create", true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
      // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        console.log(this);
      }
    };
    xhr.send(JSON.stringify(data));
    // xhr.send(new Int8Array());
    // xhr.send(document);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    validateEmail();
    validatePassword();

    if (emailError.length !== 0 || passwordError.length !== 0) {
      console.log(`don't send a request`);
      return;
    }

    requestToken();
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <form className="login-form">
          <h3 className="login_form__header mb-3">Input your account data</h3>
          <div className="input-group">
            <input
              type="email"
              name="email"
              className="form-control mb-3"
              placeholder="Your email"
              value={email}
              onChange={handleEmailChange}
            />
            <div className="login-form__error" hidden={!emailError}>
              {emailError}
            </div>
          </div>
          <div className="input-group">
            <input
              type="text"
              name="password"
              className="form-control mb-3"
              placeholder="Your password"
              value={password}
              onChange={handlePasswordChange}
            />
            <div className="login-form__error" hidden={!passwordError}>
              {passwordError}
            </div>
          </div>
          <button
            className="btn btn-primary btn-block mb-3"
            onClick={handleSubmit}
          >
            Sign in
          </button>
          <span>
            Forgot password? <a href="restore-password">Restore it.</a>
          </span>
          <span>
            Don't have an account? <a href="restore-password">Sign up!</a>
          </span>
        </form>
      </div>
    </div>
  );
};
