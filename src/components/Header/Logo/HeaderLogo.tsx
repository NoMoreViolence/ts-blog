import * as React from 'react';
import { NavLink } from 'react-router-dom';

class HeaderLogo extends React.Component<{}, {}> {
  render() {
    return (
      <h1>
        <NavLink to="/">IHP Blog</NavLink>
      </h1>
    );
  }
}

export default HeaderLogo;
