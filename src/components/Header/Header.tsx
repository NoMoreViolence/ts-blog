import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import HeaderLogo from './Logo/HeaderLogo';
import Message from './Message/HeaderMessage';
import CategoryView from './Category/HeaderCategory';

// 인풋 인터페이스
interface HandleChangeInterface {
  target: HTMLInputElement;
}

interface Category {
  category: string;
}

class Header extends React.Component<
  {
    login: number,
    changeLogined: Function,
    category: Array<Category>,
    handlePostTitleAndSubTitle: Function,
  },
  { message: string }
> {
  state = {
    message: '',
  };

  // 입력 state 업데이트
  handleChange = (e: HandleChangeInterface) => {
    this.setState({
      message: e.target.value,
    });
    // tslint:disable-next-line:semicolon
  };

  // 로그아웃 이벤트
  signOut = () => {
    sessionStorage.clear();
    this.props.changeLogined(0);
    // tslint:disable-next-line:no-console
    console.log('로그아웃 하셨습니다 - Header.tsx');
    // tslint:disable-next-line:semicolon
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <HeaderLogo
              handlePostTitleAndSubTitle={this.props.handlePostTitleAndSubTitle}
            />
          </Col>
          <Col>
            <CategoryView
              category={this.props.category}
              signOut={this.signOut}
              login={this.props.login}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Message />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Header;
