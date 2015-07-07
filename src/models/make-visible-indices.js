import Rx from 'rx';

function makeVisibleIndices$(tableHeight$, rowHeight$, rowCount$, scrollTop$) {
  let firstVisibleRow$ = Rx.Observable.combineLatest(scrollTop$, rowHeight$,
    (scrollTop, rowHeight) => Math.floor(scrollTop / rowHeight)
  ).distinctUntilChanged();

  let visibleRows$ = Rx.Observable.combineLatest(tableHeight$, rowHeight$,
    (tableHeight, rowHeight) => Math.ceil(tableHeight / rowHeight)
  );

  let visibleIndices$ = Rx.Observable.combineLatest(
    rowCount$, visibleRows$, firstVisibleRow$,
    (rowCount, visibleRows, firstVisibleRow) => {
      let visibleIndices = [];
      let lastRow = firstVisibleRow + visibleRows + 1;

      if (lastRow > rowCount) {
        firstVisibleRow -= lastRow - rowCount;
      }

      for (let i = 0; i <= visibleRows; i++) {
        visibleIndices.push(i + firstVisibleRow);
      }
      return visibleIndices;
    }
  );

  return visibleIndices$;
}

export default makeVisibleIndices$;
