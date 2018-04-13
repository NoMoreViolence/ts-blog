import * as React from 'react';
// 이건 가짜 DIV 씌워주는 리액트 태그 중 하나
import { Fragment } from 'react';
// 부트스트랩
import {
  InputGroup,
  Input,
  Button,
  Form,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
// 알림
import { toast } from 'react-toastify';

// 인풋 인터페이스
interface HandleChangeInterface {
  target: HTMLInputElement;
}

// 카테고리 선택자
interface Category {
  category: string;
}

// 드롭 다운 선택자
interface Dropdown {
  currentTarget: { textContent: string };
}

class Change extends React.Component<
  { loadCategory: Function; category: Array<Category> },
  {}
> {
  state = {
    CurrentCategory: '변경할 카테고리 선택', // [현재의 카테고리]
    changeCategory: '', // [바꿀 카테고리]
    categoryChangeDropdown: false
  };

  // [카테고리 변경 이벤트]
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { changeCategory, CurrentCategory } = this.state;
    // Form 이벤트 막기 및 이벤트 버블링 방지
    e.preventDefault();
    // 아무 데이터도 입력이 안 된게 아니고, 변경할 카테고리를 선택했을 경우, 같은 카테고리 이름으로 전송 불가
    if (
      changeCategory !== '' &&
      CurrentCategory !== '변경할 카테고리 선택' &&
      CurrentCategory.trim() !== changeCategory.trim()
    ) {
      fetch('/api/category/change', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: sessionStorage.getItem('token'),
          category: CurrentCategory.trim(),
          changeCategory: changeCategory.trim()
        }),
        mode: 'cors'
      })
        .then(res => res.json())
        .then(res => {
          if (res.success === true) {
            this.setState({
              CurrentCategory: '변경할 카테고리 선택',
              changeCategory: ''
            });
            toast(
              '" ' +
                res.oldCategory +
                ' " => " ' +
                res.newCategory +
                ' " 로 변경되었습니다'
            );
          } else {
            toast('입력값이 잘못되었거나 없습니다');
          }
          // tslint:disable-next-line:no-console
          console.log(res.message);
          this.props.loadCategory();
        })
        .catch(error => {
          // tslint:disable-next-line:no-console
          console.log('카테고리 추가 실패');
          throw error;
        });
    } else {
      if (CurrentCategory.trim() === changeCategory.trim()) {
        toast('같은 카테고리로는 변경할 필요가 없습니다');
      } else {
        toast('카테고리를 선택하시고, 글자를 입력한 후 전송해주세요');
      }
    }
    // tslint:disable-next-line:semicolon
  };

  // [드롭다운 토글] 카테고리 변경 토글
  handleCategoryChangeToggle = () => {
    this.setState({
      categoryChangeDropdown: !this.state.categoryChangeDropdown
    });
    // tslint:disable-next-line:semicolon
  };

  // [드롭다운 변경] 카테고리 선택시 데이터 바꿔주기
  handleCurrentCategory = (e: Dropdown) => {
    this.setState({ CurrentCategory: e.currentTarget.textContent });
    // tslint:disable-next-line:semicolon
  };

  // [공통]입력값 업데이트
  handleChange = (e: HandleChangeInterface) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    // tslint:disable-next-line:semicolon
  };

  render() {
    // state 콧수염 함수로
    const {
      CurrentCategory,
      changeCategory,
      categoryChangeDropdown
    } = this.state;

    // 데이터 받아서 정렬
    const CurrentCategoryChangeBar = (data: Array<Category>) => {
      return data.map((object, i) => {
        return (
          <DropdownItem key={i} onClick={this.handleCurrentCategory}>
            {object.category}
          </DropdownItem>
        );
      });
    };

    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
          <InputGroup>
            <Dropdown
              isOpen={categoryChangeDropdown}
              toggle={this.handleCategoryChangeToggle}
            >
              <DropdownToggle outline={true} color="info" caret={true}>
                {CurrentCategory}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.handleCurrentCategory}>
                  변경할 카테고리 선택
                </DropdownItem>
                {CurrentCategoryChangeBar(this.props.category)}
              </DropdownMenu>
            </Dropdown>
            <Input
              name="changeCategory"
              placeholder="변경할 카테고리 이름 입력"
              value={changeCategory}
              onChange={this.handleChange}
            />
            <Button outline={true} color="info">
              카테고리 변경
            </Button>
          </InputGroup>
        </Form>
      </Fragment>
    );
  }
}

export default Change;
