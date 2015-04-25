var Rx = require('rx');
var update = require('react/lib/update');

var CounterKeys = require('../keys/counter-keys');
var CounterIntent = require('../intents/counter-intent');

var subject = new Rx.ReplaySubject(1);

var state = {
  counter: 0
};

function incrementCounter() {
  state = update(state, {
    $merge: {
      counter: state.counter + 1
    }
  });
  subject.onNext(state);
}

CounterIntent.subject.subscribe(function (payload) {
  switch(payload.key) {
    case CounterKeys.INCREMENT_COUNTER:
      incrementCounter();
      break;
    default:
      console.warn(`${payload.key} not recognized in model.`);
  }
});

subject.onNext(state);

module.exports = {
  subject: subject
};
