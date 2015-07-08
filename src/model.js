import Rx from 'rx';

import makeVisibleIndices$ from './models/make-visible-indices';
import makeColumnWidths$ from './models/make-column-widths';
import makeSortedRows$ from './models/make-sorted-rows';
import makeFilteredRows$ from './models/make-filtered-rows';

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
  let filterEvenRows$ = actions.filterEvenRows$.startWith(false);

  let tableData$ = actions.tableData$.startWith(defaultTableData);
  let columns$ = tableData$.map(data => data.columns);
  let defaultColumnWidths$ = tableData$.map(data => data.defaultColumnWidths);
  let rawRows$ = tableData$.map(data => data.rows);

  let sortedRows$ = makeSortedRows$(rawRows$, columnSort$);

  let rows$ = makeFilteredRows$(sortedRows$, filterEvenRows$);
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
    filterEvenRows$,
    (
      tableHeight,
      rowHeight,
      columns,
      rowCount,
      visibleIndices,
      columnWidths,
      rows,
      columnSort,
      filterEvenRows
    ) => ({
      tableHeight,
      rowHeight,
      columns,
      rowCount,
      visibleIndices,
      columnWidths,
      rows,
      columnSort,
      filterEvenRows
    })
  );
}

export default model;
