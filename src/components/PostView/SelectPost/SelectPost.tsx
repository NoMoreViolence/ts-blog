import * as React from 'react';

interface PropTypes {
  params: { postName: string };
}

// 포스트 선택
class SelectPost extends React.Component<{ match: PropTypes }, {}> {
  componentDidUpdate(prevProps: object, prevState: object) {
    console.log('componentDidUpdate');
  }

  render() {
    return <div>{this.props.match.params.postName}</div>;
  }
}

export default SelectPost;
