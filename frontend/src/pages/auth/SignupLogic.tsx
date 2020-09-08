import React, { useState, useEffect } from "react";
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

  const inputIsValid = { email: false, password: false };

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
    const wrongEmailMessage = emailPattern.test(email)
      ? ""
      : "Please, provide a valid email address";
    inputIsValid.email = wrongEmailMessage.length === 0;
    updateEmailError(wrongEmailMessage);
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
    inputIsValid.password = wrongPasswordMessage.length === 0;
    updatePasswordError(wrongPasswordMessage);
  };

  const createUser = () => {
    console.log("sending request");
    const data = { email, password };
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "api/users/", true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.addEventListener("load", () => console.log(xhr.responseText));

    xhr.send(JSON.stringify(data));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    validateEmail();
    validatePassword();

    if (!inputIsValid.email || !inputIsValid.password) {
      return;
    }

    createUser();
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
