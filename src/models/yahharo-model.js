var Rx = require('rx');
var update = require('react/lib/update');

var YahharoKeys = require('../keys/yahharo-keys');
var YahharoIntent = require('../intents/yahharo-intent');

var subject = new Rx.ReplaySubject(1);

var yahharo = 'やっはろー';
var haroharo = 'はろはろー';

var state = {
  greeting: yahharo
};

function switchGreeting() {
  state = update(state, {
    $merge: {
      greeting: state.greeting === yahharo ? haroharo : yahharo
    }
  });
  subject.onNext(state);
}

YahharoIntent.subject.subscribe(function (payload) {
  switch(payload.key) {
    case YahharoKeys.SWITCH_GREETING:
      switchGreeting();
      break;
    default:
      console.warn(`${payload.key} not recognized in model.`);
  }
});

subject.onNext(state);

module.exports = {
  subject: subject
};
