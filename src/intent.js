var Rx = require('rx');

var Keys = require('./keys');

var intentSubject = new Rx.ReplaySubject(1);

module.exports = {
  subject: intentSubject,

  incrementCounter: function () {
    intentSubject.onNext({
      key: Keys.INCREMENT_COUNTER
    });
  }
};
