class HelloMessage extends React.Component {
  render() {
    return <div>Hello 122211{this.props.name}</div>;
  }
}

ReactDOM.render(
  <HelloMessage name="John" />,
  document.querySelector('#auth')
);
