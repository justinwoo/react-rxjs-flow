# dynamic-width-filtering-sorting-scroll-table-with-data-loading

This branch is in turn based off of https://github.com/justinwoo/react-rxjs-flow/tree/dynamic-width-scroll-table, and has more featuers and still ends up combining the multiple features together by combining relevant streams.

## Before

```js
  let columns$             = Rx.Observable.just(['ID (fixed width)', 'ID * 10', 'Random Number']);
  let defaultColumnWidths$ = Rx.Observable.just([300, null, null]);

  let tableHeight$ = Rx.Observable.just(500);
  let rowHeight$   = Rx.Observable.just(30);
  let rowCount$    = Rx.Observable.just(10000);
  let scrollTop$   = actions.scrollTop$.startWith(0);

  let visibleIndices$ = makeVisibleIndices$(
    tableHeight$, rowHeight$, rowCount$, scrollTop$
  );

  let containerWidth$ = actions.containerWidth$.startWith(window.innerWidth);
  let columnWidths$ = makeColumnWidths$(
    defaultColumnWidths$,
    containerWidth$
  );
```

## After
```js
  let columnSort$     = actions.columnSort$.startWith(defaultColumnSort);
  let filterEvenRows$ = actions.filterEvenRows$.startWith(false);

  // Actually load data in
  let tableData$           = actions.tableData$.startWith(defaultTableData);
  let columns$             = tableData$.map(data => data.columns);
  let defaultColumnWidths$ = tableData$.map(data => data.defaultColumnWidths);

  // Row data is mapped from the table data stream
  let rawRows$ = tableData$.map(data => data.rows);

  // Sort rows with information about how columns are sorted
  let sortedRows$ = makeSortedRows$(rawRows$, columnSort$);

  // Then we take that to filter the rows by criteria
  // In this case whether filtering by even-numbered ids or not
  let rows$     = makeFilteredRows$(sortedRows$, filterEvenRows$);
  let rowCount$ = rows$.map(rows => rows.length);

  let tableHeight$ = Rx.Observable.just(500);
  let rowHeight$   = Rx.Observable.just(30);
  let scrollTop$   = actions.scrollTop$.startWith(0);

  let visibleIndices$ = makeVisibleIndices$(
    tableHeight$, rowHeight$, rowCount$, scrollTop$
  );

  let containerWidth$ = actions.containerWidth$.startWith(window.innerWidth);
  let columnWidths$ = makeColumnWidths$(
    defaultColumnWidths$,
    containerWidth$
  );
```
