import React from 'react';

import intent from './intent';
import model from './model';
import view from './view';

function main() {
  let actions = intent();
  let state$ = model(actions);
  let output$ = view(state$);

  return output$;
}

let target = document.getElementById('app');

main().subscribe(Output => React.render(Output, target));
