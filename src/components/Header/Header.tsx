import * as React from 'react';
import './Header.css';
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Input,
  Button,
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap';

import { NavLink } from 'react-router-dom';

// 인풋 인터페이스
interface HandleNameChangeInterface {
  target: HTMLInputElement;
}

// state 설정
class Header extends React.Component<{}, { search: string; url: string }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      search: '',
      url: '/search/'
    };
    // 바인딩!
    this.handleChange = this.handleChange.bind(this);
  }

  // 입력 state 업데이트
  handleChange(e: HandleNameChangeInterface) {
    this.setState({
      search: e.target.value,
      url: '/search/' + e.target.value
    });
  }

  // tslint:disable-next-line:no-any
  handleSubmit = (e: any) => {
    e.preventDefault();
    fetch(`/search/${this.state.search}`)
      .then(res => res.json())
      .then(res => {
        // tslint:disable-next-line:no-console
        console.log(res);
      });
    // tslint:disable-next-line:semicolon
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>IHP Blog</h1>
          </Col>
          <Col>
            <Breadcrumb>
              <BreadcrumbItem />
              <BreadcrumbItem>
                <NavLink to="/category/React.js">React.js</NavLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <NavLink to="/category/Node.js">Node.js</NavLink>
              </BreadcrumbItem>
              <BreadcrumbItem active={true}>Category</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={this.handleSubmit}>
              <InputGroup>
                <Input value={this.state.search} onChange={this.handleChange} />
                <Button color="primary">Search</Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Header;
