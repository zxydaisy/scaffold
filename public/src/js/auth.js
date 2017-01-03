

class HelloMessage extends React.Component {
  render() {
    return <div>Hello 1weasdffee22211{this.props.name}</div>;
  }
}

ReactDOM.render(
  <HelloMessage name="John" />,
  document.querySelector('#auth')
);
