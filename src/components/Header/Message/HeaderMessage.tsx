import * as React from 'react';
import { InputGroup, Input, Form, Button } from 'reactstrap';
import { toast } from 'react-toastify';

interface TextEdit {
  target: HTMLInputElement;
}

class Message extends React.Component<{}, {}> {
  state = {
    message: '',
  };

  handleChange = (e: TextEdit) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    // tslint:disable-next-line:semicolon
  };

  // Header Form 이벤트
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.state.message !== '') {
      // 메시지 보내기
      fetch('/api/ripple/talk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: this.state.message,
        }),
        mode: 'cors',
      })
        .then(res => res.json())
        .then(res => {
          this.setState({
            message: '',
          });
          toast('메시지가 전송 되었습니다 !');
        })
        .catch(error => {
          toast('이런, 알 수 없는 이유로 실패하고 말았어요');
          // tslint:disable-next-line:no-console
          console.log('메시지 보내기 실패');
          throw error;
        });
    }
    // tslint:disable-next-line:semicolon
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <InputGroup>
          <Input
            placeholder="하고 싶은 말을 적어주세요!"
            value={this.state.message}
            onChange={this.handleChange}
            name="message"
          />
          <Button color="primary">하고 싶은 말 보내기</Button>
        </InputGroup>
      </Form>
    );
  }
}

export default Message;
