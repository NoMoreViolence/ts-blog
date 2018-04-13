import * as React from 'react';
import './Main.css';
import { NavLink } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  CardTitle,
  CardSubtitle,
  CardText,
  CardColumns,
  CardBody,
} from 'reactstrap';

interface PostUnit {
  title: string;
  subTitle: string;
  category: string;
}

class Main extends React.Component<{ allPost: Array<PostUnit> }, {}> {
  render() {
    const callAllPosts = (Posts: Array<PostUnit>) => {
      return Posts.map((object, i: number) => {
        const url = `/category/${object.category}/${object.title}`;
        return (
          <Card key={i}>
            <CardBody>
              <CardTitle>{object.title}</CardTitle>
              <CardSubtitle>{object.category}</CardSubtitle>
              <CardText>{object.subTitle}</CardText>
              <NavLink to={url}>
                <Button color="primary">See Post!</Button>
              </NavLink>
            </CardBody>
          </Card>
        );
      });
    };

    return (
      <Container className="main-page">
        <Row>
          <Col>
            <CardColumns>{callAllPosts(this.props.allPost)}</CardColumns>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Main;
