import React from 'react';

import Root from './views/root';

function view(state$) {
  return state$.map(state => <Root {...state}/>);
}

export default view;
