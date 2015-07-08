import Rx from 'rx';

import makeVisibleIndices$ from './models/make-visible-indices';
import makeColumnWidths$ from './models/make-column-widths';
import makeSortedRows$ from './models/make-sorted-rows';

let defaultTableData = {
  columns: [],
  defaultColumnWidths: [],
  rows: []
};

let defaultColumnSort = {
  column: null,
  sortDirection: null
};

function model(actions) {
  let columnSort$ = actions.columnSort$.startWith(defaultColumnSort);

  let tableData$ = actions.tableData$.startWith(defaultTableData);
  let columns$ = tableData$.map(data => data.columns);
  let defaultColumnWidths$ = tableData$.map(data => data.defaultColumnWidths);
  let rawRows$ = tableData$.map(data => data.rows);

  let rows$ = makeSortedRows$(rawRows$, columnSort$);
  let rowCount$ = rows$.map(rows => rows.length);

  let tableHeight$ = Rx.Observable.just(500);
  let rowHeight$ = Rx.Observable.just(30);
  let scrollTop$ = actions.scrollTop$.startWith(0);

  let visibleIndices$ = makeVisibleIndices$(
    tableHeight$, rowHeight$, rowCount$, scrollTop$
  );

  let containerWidth$ = actions.containerWidth$.startWith(window.innerWidth);
  let columnWidths$ = makeColumnWidths$(
    defaultColumnWidths$,
    containerWidth$
  );

  return Rx.Observable.combineLatest(
    tableHeight$,
    rowHeight$,
    columns$,
    rowCount$,
    visibleIndices$,
    columnWidths$,
    rows$,
    columnSort$,
    (
      tableHeight,
      rowHeight,
      columns,
      rowCount,
      visibleIndices,
      columnWidths,
      rows,
      columnSort
    ) => ({
      tableHeight,
      rowHeight,
      columns,
      rowCount,
      visibleIndices,
      columnWidths,
      rows,
      columnSort
    })
  );
}

export default model;
