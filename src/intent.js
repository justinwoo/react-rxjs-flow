import {scrollTop$} from './intents/user-scroll';
import {containerWidth$} from './intents/container-resize';
import {tableData$} from './intents/table-data';
import {columnSort$} from './intents/column-sort';

function intent() {
  let actions = {
    scrollTop$,
    containerWidth$,
    tableData$,
    columnSort$
  };
  return actions;
}

export default intent;
