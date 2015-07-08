import Rx from 'rx';

function makeSortedRows(rawRows$, columnSort$) {
	return Rx.Observable.combineLatest(
    rawRows$,
    columnSort$,
    (rawRows, columnSort) => {
      if (columnSort.column === null) {
        return rawRows;
      } else {
        let {sortDirection, column} = columnSort;
        let newRows = rawRows.map(x => x);
        newRows.sort((left, right) => {
          let a = left[column];
          let b = right[column];
          let sortResult;
          if (a < b) {
            sortResult = -1;
          } else if (a > b) {
            sortResult = 1;
          } else  {
            sortResult = 0;
          }
          return sortDirection === 1 ? sortResult : -1 * sortResult;
        });

        return newRows;
      }
    }
  );
}

export default makeSortedRows;
