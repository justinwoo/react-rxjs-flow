import Rx from 'rx';

let columnSortAction = new Rx.Subject();

export let getHandleColumnSort = (currentColumn, sortDirection, newColumn) => {
  let newSortDirection;
  if (newColumn === currentColumn) {
    newSortDirection = sortDirection === 1 ? -1 : 1;
  } else {
    newSortDirection = 1;
  }
  return () => {
    columnSortAction.onNext({
      column: newColumn,
      sortDirection: newSortDirection
    });
  }
};

export let columnSort$ = columnSortAction;
