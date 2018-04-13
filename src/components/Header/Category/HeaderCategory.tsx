import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

interface Category {
  category: string;
}

class CategoryView extends React.Component<
  { category: Array<Category>, signOut: Function, login: number },
  {}
> {
  state = {};

  handleSignOut = () => {
    this.props.signOut();
    // tslint:disable-next-line:semicolon
  };

  render() {
    // 데이터 받아서 정렬
    const CurrentCategoryChangeBar = (data: Array<Category>) => {
      return data.map((object, i) => {
        const url = `/category/${object.category}`;
        return (
          <BreadcrumbItem key={i}>
            <NavLink to={url}>{object.category}</NavLink>
          </BreadcrumbItem>
        );
      });
    };

    return (
      <Breadcrumb>
        <BreadcrumbItem />
        {CurrentCategoryChangeBar(this.props.category)}
        {this.props.login === 1 && (
          <BreadcrumbItem>
            <NavLink to="/admin/post">관리자 페이지</NavLink>
          </BreadcrumbItem>
        )}
        {this.props.login === 1 && (
          <BreadcrumbItem>
            <NavLink to="/" onClick={this.handleSignOut}>
              Sign out
            </NavLink>
          </BreadcrumbItem>
        )}
        {this.props.login === 0 && (
          <BreadcrumbItem>
            <NavLink to="/admin/login">관리자 로그인</NavLink>
          </BreadcrumbItem>
        )}
        <BreadcrumbItem active={true}>Category</BreadcrumbItem>
      </Breadcrumb>
    );
  }
}

export default CategoryView;
