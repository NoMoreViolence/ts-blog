import * as React from 'react';
import { Input, InputGroup, Button, Form } from 'reactstrap';
// 알림
import { toast } from 'react-toastify';

interface HandleChangeInterface {
  target: HTMLInputElement;
}

class Add extends React.Component<{ loadCategory: Function }, {}> {
  state = {
    addValue: '' // [추가할 카테고리 값]
  };

  // [공통]입력값 업데이트
  handleChange = (e: HandleChangeInterface) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    // tslint:disable-next-line:semicolon
  };

  // [공통] 카테고리 추가 변경 삭제 이벤트 총집합
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Form 이벤트 막기 및 이벤트 버블링 기
    e.preventDefault();
    // tslint:disable-next-line:no-console
    console.log(e.currentTarget.textContent);
    // 카테고리 추가
    if (e.currentTarget.textContent === '카테고리 추가') {
      if (this.state.addValue !== '') {
        fetch('/api/category/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: sessionStorage.getItem('token'),
            category: this.state.addValue
          }),
          mode: 'cors'
        })
          .then(res => res.json())
          .then(res => {
            this.setState({
              addValue: ''
            });
            if (res.success === true) {
              toast('" ' + res.category + ' " 카테고리가 추가 되었습니다');
            } else {
              toast('입력값이 중복되었거나 없습니다');
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
        toast('글자를 입력해 주세요');
      }
    }
    // tslint:disable-next-line:semicolon
  };

  render() {
    const { addValue } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <InputGroup>
          <Input
            name="addValue"
            value={addValue}
            onChange={this.handleChange}
          />
          <Button outline={true} color="primary">
            카테고리 추가
          </Button>
        </InputGroup>
      </Form>
    );
  }
}

export default Add;
