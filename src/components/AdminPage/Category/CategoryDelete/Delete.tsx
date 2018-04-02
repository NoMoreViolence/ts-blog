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

class Delete extends React.Component<
  { loadCategory: Function; category: Array<Category> },
  {}
> {
  state = {
    selectedWillDelete: '삭제할 카테고리 선택', // [현재 카테고리]
    doubleCheck: '', // [입력 카테고리]
    categoryDeleteDropdown: false
  };

  // [카테고리 삭제 이벤트]
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { selectedWillDelete, doubleCheck } = this.state;
    // Form 이벤트 막기 및 이벤트 버블링 기
    e.preventDefault();
    // 아무 데이터도 입력이 안 된게 아니고, 변경할 카테고리를 선택했을 경우
    if (
      selectedWillDelete !== '삭제할 카테고리 선택' &&
      selectedWillDelete === doubleCheck
    ) {
      fetch('/api/category/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: sessionStorage.getItem('token'),
          category: selectedWillDelete,
          categoryDoubleCheck: doubleCheck
        }),
        mode: 'cors'
      })
        .then(res => res.json())
        .then(res => {
          if (res.success === true) {
            this.setState({
              selectedWillDelete: '변경할 카테고리 선택',
              doubleCheck: ''
            });
            toast('" ' + res.category + ' " 가 삭제되었습니다');
          } else {
            toast('입력값이 중복되었거나 없습니다');
          }
          // tslint:disable-next-line:no-console
          console.log(res.message);
          this.props.loadCategory();
        })
        .catch(error => {
          toast('이런, 알 수 없는 이유로 실패하고 말았어요');
          // tslint:disable-next-line:no-console
          console.log('카테고리 추가 실패');
          throw error;
        });
    } else {
      toast('카테고리를 선택하시고, 글자를 입력한 후 전송해주세요');
    }
    // tslint:disable-next-line:semicolon
  };

  // [드롭다운 토글] 카테고리 변경 토글
  handleCategoryDeleteToggle = () => {
    this.setState({
      categoryDeleteDropdown: !this.state.categoryDeleteDropdown
    });
    // tslint:disable-next-line:semicolon
  };

  // [드롭다운 변경] 카테고리 선택시 데이터 바꿔주기
  handleCurrentCategory = (e: Dropdown) => {
    this.setState({ selectedWillDelete: e.currentTarget.textContent });
    // tslint:disable-next-line:semicolon
  };

  // [공통] 입력값 업데이트
  handleChange = (e: HandleChangeInterface) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    // tslint:disable-next-line:semicolon
  };

  render() {
    const {
      doubleCheck,
      selectedWillDelete,
      categoryDeleteDropdown
    } = this.state;

    // [데이터 받아서 정렬]
    const CurrentCategoryDeleteBar = (data: Array<Category>) => {
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
              isOpen={categoryDeleteDropdown}
              toggle={this.handleCategoryDeleteToggle}
            >
              <DropdownToggle outline={true} color="danger" caret={true}>
                {selectedWillDelete}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.handleCurrentCategory}>
                  삭제할 카테고리 선택
                </DropdownItem>
                {CurrentCategoryDeleteBar(this.props.category)}
              </DropdownMenu>
            </Dropdown>
            <Input
              name="doubleCheck"
              value={doubleCheck}
              onChange={this.handleChange}
            />
            <Button outline={true} color="danger">
              카테고리 삭제
            </Button>
          </InputGroup>
        </Form>
      </Fragment>
    );
  }
}

export default Delete;
