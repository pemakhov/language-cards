import React from "react";
import "./Auth.scss";

export interface ILoginProps {
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
  handleEmailChange: (event: React.ChangeEvent) => void;
  handlePasswordChange: (event: React.ChangeEvent) => void;
  handleSubmit: (event: any) => void;
}

export const Login = (props: ILoginProps) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <form className="auth-form">
          <h3 className="auth_form__header mb-3">Input Your Account Data to Log In</h3>
          <div className="input-group">
            <input
              type="email"
              name="email"
              className="form-control mb-3"
              placeholder="Your email"
              value={props.email}
              onChange={props.handleEmailChange}
            />
            <div className="auth-form__error" hidden={!props.emailError}>
              {props.emailError}
            </div>
          </div>
          <div className="input-group">
            <input
              type="text"
              name="password"
              className="form-control mb-3"
              placeholder="Your password"
              value={props.password}
              onChange={props.handlePasswordChange}
            />
            <div className="auth-form__error" hidden={!props.passwordError}>
              {props.passwordError}
            </div>
          </div>
          <button
            className="btn btn-primary btn-block mb-3"
            onClick={props.handleSubmit}
          >
            Sign in
          </button>
          <span>
            Forgot password? <a href="/restore-password">Restore it.</a>
          </span>
          <span>
            Don't have an account? <a href="/signup">Sign up!</a>
          </span>
        </form>
      </div>
    </div>
  );
};
