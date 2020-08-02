import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth, useAuthUpdate } from "../../context/AuthContext";
import { Signup } from "./Signup";

export const SignupLogic = () => {
  let isLoggedIn = useAuth();
  const updateLogin = useAuthUpdate();

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
    console.log("sending request");
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

    // requestToken();
    setTimeout(() => {
      isLoggedIn = true;
      updateLogin && updateLogin(isLoggedIn);
    }, 2000);
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Signup
      email={email}
      password={password}
      emailError={emailError}
      passwordError={passwordError}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSubmit}
    />
  );
};
