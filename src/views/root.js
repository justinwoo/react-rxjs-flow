var React = require('react');

var Intent = require('../intent');

class Root extends React.Component {

  constructor() {
    super();

    this.handleIncrement = function () {
      Intent.incrementCounter();
    };

    this.handleChange = function () {
      Intent.changeFilter();
    };
  }

  render() {
    console.log('props', this.props);
    return (
      <div>
        <h1>Hello</h1>
        <p>counter: {this.props.counter}</p>
        <p>list: {this.props.filteredList}</p>
        <button onClick={this.handleIncrement}>increment</button>
        <button onClick={this.handleChange}>change filter</button>
      </div>
    );
  }
}

module.exports = Root;
