import * as React from 'react';

export interface INavLinkProps {
  href: string;
  linkText: string;
  clickHandler: Function;
}

export class NavLink extends React.Component<INavLinkProps> {
  public render() {
    return (
          <li className="nav-item" >
            <a href={this.props.href} className="nav-link" onClick={() => this.props.clickHandler()} >
              {this.props.linkText}
            </a>
          </li>
    );
  }
}
