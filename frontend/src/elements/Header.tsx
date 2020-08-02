import React from "react";
import './Header.scss';

export interface IHeaderProps {
  value: string;
  explanation?: string;
}

export const Header = (props: IHeaderProps) => {
  return (
    <header>
      <h1>{props.value}</h1>
      <div className="explanation">{props.explanation}</div>
    </header>
  );
};
