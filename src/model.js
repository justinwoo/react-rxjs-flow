var Rx = require('rx');
var update = require('react/lib/update');

var Keys = require('./keys');
var Intent = require('./intent');

var subject = new Rx.ReplaySubject(1);

var state = {
  counter: 0,
  list: [],
  filterEvens: true
};

function incrementCounter() {
  state = update(state, {
    $merge: {
      counter: state.counter + 1,
      list: state.list.concat(state.counter)
    }
  });
  subject.onNext(state);
}

function changeFilter() {
  state = update(state, {
    $merge: {
      filterEvens: state.filterEvens ? false : true
    }
  });
  subject.onNext(state);
}

Intent.subject.subscribe(function (payload) {
  switch(payload.key) {
    case Keys.INCREMENT_COUNTER:
      incrementCounter();
      break;
    case Keys.CHANGE_FILTER:
      changeFilter();
      break;
    default:
      console.warn(`${payload.key} not recognized in model.`);
  }
});

subject.onNext(state);

module.exports = {
  subject: subject
};
