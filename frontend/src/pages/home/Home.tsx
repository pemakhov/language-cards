import * as React from 'react';
import './Home.scss';
import { NavBar } from '../../navbar/NavBar';

export interface IHomeProps {
}

export class Home extends React.Component<IHomeProps> {

  public render() {
    return (
      <div>
        <NavBar />
        <div className="container-md mt-3">
          hello world
        </div>
      </div>
    );
  }
}
