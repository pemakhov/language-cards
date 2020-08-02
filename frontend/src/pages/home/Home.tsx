import * as React from 'react';
import './Home.scss';
import { NavBar } from '../../elements/navbar/NavBar';
import { HomeGuest } from './HomeGuest';
import { Header, IHeaderProps } from '../../elements/Header';

export interface IHomeProps {

}

export const Home = (props: IHeaderProps) => {
  const headerValue = 'Learn English the Hard Way';
  const headerExplanation = 'A website for those, who want to enrich their vocabulary';

    return (
      <div>
        <NavBar />
        <Header value={headerValue} explanation={headerExplanation} />
        <HomeGuest />
      </div>
    );
}
