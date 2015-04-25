var React = require('react');
var Rx = require('rx');

var CounterModel = require('./models/counter-model');
var YahharoModel = require('./models/yahharo-model');
var Root = require('./views/root');

var AppObservable = Rx.Observable.combineLatest(
  CounterModel.subject,
  YahharoModel.subject,
  function (
    CounterState,
    YahharoState
  ) {
    return {
      CounterState: CounterState,
      YahharoState: YahharoState
    };
  }
);

AppObservable.subscribe((appState) => {
  React.render(
    <Root {...appState}/>,
    document.getElementById('app')
  );
});
