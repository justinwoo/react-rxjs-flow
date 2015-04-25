var Rx = require('rx');

var Keys = require('../keys/yahharo-keys');

var intentSubject = new Rx.ReplaySubject(1);

module.exports = {
  subject: intentSubject,

  switchGreeting: function () {
    intentSubject.onNext({
      key: Keys.SWITCH_GREETING
    });
  }
};
