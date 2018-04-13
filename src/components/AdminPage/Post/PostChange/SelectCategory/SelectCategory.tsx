import * as React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

// 카테고리 받아올 때 props 내부 변수 인터페이스
interface Category {
  category: string;
}

// 드롭 다운 선택자 인터페이스
interface Dropdown {
  currentTarget: { textContent: string };
}

// 포스트의 제목만 받아올 때 state 내부 변수 인터페이스
interface Post {
  title: string;
}

class SelectCategory extends React.Component<
  {
    handleSearchCategorysPost: Function,
    category: Array<Category>,
    posts: Array<Post>,
    origin: number,
    originFun: Function,
  },
  {}
> {
  state = {
    dropDown: false,
    selectCategory: '카테고리 선택',
  };

  // 토글
  handleToogle = () => {
    this.setState({
      dropDown: !this.state.dropDown,
    });
    // tslint:disable-next-line:semicolon
  };
  // 카테고리 선택
  handleSelectCategory = async (e: Dropdown) => {
    await this.setState({
      selectCategory: e.currentTarget.textContent,
    });

    this.props.handleSearchCategorysPost(this.state.selectCategory, 'change');
    // tslint:disable-next-line:semicolon
  };

  // 카테고리 수정 성공 시 카테고리 선택 State 초기화
  componentDidUpdate(prevProps: object, prevState: object) {
    if (this.props.origin === 1) {
      this.setState({
        selectCategory: '카테고리 선택',
      });
      this.props.originFun(0);
    }
  }

  render() {
    const { dropDown, selectCategory } = this.state;

    const selectCategoryBar = (data: Array<Category>) => {
      return data.map((object, i) => {
        return (
          <DropdownItem key={i} onClick={this.handleSelectCategory}>
            {object.category}
          </DropdownItem>
        );
      });
    };

    return (
      <Dropdown isOpen={dropDown} toggle={this.handleToogle}>
        <DropdownToggle outline={true} color="info" caret={true}>
          {selectCategory}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.handleSelectCategory}>
            카테고리 선택
          </DropdownItem>
          {selectCategoryBar(this.props.category)}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default SelectCategory;
