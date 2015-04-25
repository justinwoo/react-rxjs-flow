var React = require('react');
var Rx = require('rx');
var update = require('react/lib/update');

var Model = require('./model');
var Root = require('./views/root');

var FilteredObservable = Model.subject.map(function (appState) {
  var filteredList = appState.list.filter(function (item) {
    var isEven = item % 2 === 0
    return appState.filterEvens ? !isEven : isEven;
  });
  return update(appState, {
    $merge: {
      filteredList: filteredList
    }
  });
});

FilteredObservable.subscribe((appState) => {
  React.render(
    <Root {...appState}/>,
    document.getElementById('app')
  );
});
