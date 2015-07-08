import Rx from 'rx';

import makeVisibleIndices$ from './models/make-visible-indices';
import makeColumnWidths$ from './models/make-column-widths';

function model(actions) {
  let tableData$ = actions.tableData$.startWith({
    columns: [],
    defaultColumnWidths: [],
    rows: []
  });
  let columns$ = tableData$.map(data => data.columns);
  let defaultColumnWidths$ = tableData$.map(data => data.defaultColumnWidths);
  let rows$ = tableData$.map(data => data.rows);
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
    (
      tableHeight,
      rowHeight,
      columns,
      rowCount,
      visibleIndices,
      columnWidths,
      rows
    ) => ({
      tableHeight,
      rowHeight,
      columns,
      rowCount,
      visibleIndices,
      columnWidths,
      rows
    })
  );
}

export default model;
