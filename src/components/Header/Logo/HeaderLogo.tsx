import * as React from 'react';
import { NavLink } from 'react-router-dom';

class HeaderLogo extends React.Component<
  { handlePostTitleAndSubTitle: Function },
  {}
> {
  // 메인 페이지로 돌아왔을 때 혹시라도 추가된 포스트가 있을 수 있으므로 확인
  handleClick = () => {
    this.props.handlePostTitleAndSubTitle();
    // tslint:disable-next-line:semicolon
  };

  render() {
    return (
      <h1>
        <NavLink to="/" onClick={this.handleClick}>
          IHP Blog
        </NavLink>
      </h1>
    );
  }
}

export default HeaderLogo;
