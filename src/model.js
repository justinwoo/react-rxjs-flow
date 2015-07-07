import Rx from 'rx';

import makeVisibleIndices$ from './models/make-visible-indices';
import makeColumnWidths$ from './models/make-column-widths';

function model(actions) {
  let columns$ = Rx.Observable.just(['ID (fixed width)', 'ID * 10', 'Random Number']);
  let defaultColumnWidths$ = Rx.Observable.just([300, null, null]);

  let tableHeight$ = Rx.Observable.just(500);
  let rowHeight$ = Rx.Observable.just(30);
  let rowCount$ = Rx.Observable.just(10000);
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
    (
      tableHeight,
      rowHeight,
      columns,
      rowCount,
      visibleIndices,
      columnWidths
    ) => ({
      tableHeight,
      rowHeight,
      columns,
      rowCount,
      visibleIndices,
      columnWidths
    })
  );
}

export default model;
