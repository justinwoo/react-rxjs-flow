var React = require('react');

var CounterIntent = require('../intents/counter-intent');
var YahharoIntent = require('../intents/yahharo-intent');

class Root extends React.Component {

  constructor() {
    super();

    this.handleIncrement = function () {
      CounterIntent.incrementCounter();
    };

    this.handleSwitch = function () {
      YahharoIntent.switchGreeting();
    };
  }

  render() {
    console.log('props', this.props);
    return (
      <div>
        <h1>{this.props.YahharoState.greeting}</h1>
        <button onClick={this.handleSwitch}>Switch Greeting</button>
        <p>counter: {this.props.CounterState.counter}</p>
        <button onClick={this.handleIncrement}>increment</button>
      </div>
    );
  }
}

module.exports = Root;
