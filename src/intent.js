import {scrollTop$} from './intents/user-scroll';
import {containerWidth$} from './intents/container-resize';
import {tableData$} from './intents/table-data';

function intent() {
  let actions = {
    scrollTop$,
    containerWidth$,
    tableData$
  };
  return actions;
}

export default intent;
