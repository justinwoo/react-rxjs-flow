import {scrollTop$} from './intents/user-scroll';
import {containerWidth$} from './intents/container-resize';
import {tableData$} from './intents/table-data';
import {columnSort$} from './intents/column-sort';
import {filterEvenRows$} from './intents/filter-rows';

function intent() {
  let actions = {
    scrollTop$,
    containerWidth$,
    tableData$,
    columnSort$,
    filterEvenRows$
  };
  return actions;
}

export default intent;
