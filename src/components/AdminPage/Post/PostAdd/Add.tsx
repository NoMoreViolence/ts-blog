import * as React from 'react';
import ReactMde, { ReactMdeTypes } from 'react-mde';
import './Add.css';

// 프롭스
interface ReactMdeProps {}
// 스테이트 정의
interface ReactMdeState {
  reactMdeValue: ReactMdeTypes.Value;
}

class Add extends React.Component<ReactMdeProps, ReactMdeState> {
  state = {
    reactMdeValue: { text: '' }
  };

  handleValueChange = (value: ReactMdeTypes.Value) => {
    this.setState({ reactMdeValue: value });
    // tslint:disable-next-line:no-console
    console.log(this.state.reactMdeValue);
    // tslint:disable-next-line:semicolon
  };

  render() {
    return (
      <div className="addEditor">
        <div className="addEditorShowNone">
          <ReactMde
            textAreaProps={{
              id: 'post',
              name: 'post'
            }}
            value={this.state.reactMdeValue}
            onChange={this.handleValueChange}
            showdownOptions={{ tables: true, simplifiedAutoLink: true }}
          />
        </div>
      </div>
    );
  }
}

export default Add;
