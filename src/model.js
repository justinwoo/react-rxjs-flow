var Rx = require('rx');
var update = require('react/lib/update');

var Keys = require('./keys');
var Intent = require('./intent');

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

Intent.subject.subscribe(function (payload) {
  switch(payload.key) {
    case Keys.INCREMENT_COUNTER:
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
