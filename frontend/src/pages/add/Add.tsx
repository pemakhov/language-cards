import * as React from "react";
import { NavBar } from "../../elements/navbar/NavBar";
import "./Add.scss";
import { useAuth, useAuthUpdate } from "../../context/AuthContext";

export interface IAddProps {}

export const Add = () => {
  const isLoggedIn = useAuth();
  const updateLogin = useAuthUpdate();

  const fetchExamples = (): string[] | null => {
    return null;
  };

  return (
    <>
      <NavBar />
      <div className="container-md">
        <form>
          <div className="form-group mt-3">
            <label htmlFor="keyword">Enter a word to find some examples:</label>
            <input type="text" id="keyword" className="ml-2" />
            <input
              type="button"
              value="Go!"
              className="ml-2"
              onClick={fetchExamples}
            />
          </div>
        </form>
        Add card
      </div>
    </>
  );
};
