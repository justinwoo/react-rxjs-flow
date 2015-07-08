import Rx from 'rx';

function makeFilteredRows$(rows$, filterEvenRows$) {
	return Rx.Observable.combineLatest(
    rows$,
    filterEvenRows$,
    (rows, filterEvenRows) => {
      if (filterEvenRows) {
        return rows.reduce((agg, row) => {
          if (row[0] % 2 !== 0) {
            agg.push(row);
          }
          return agg;
        }, []);
      } else {
        return rows;
      }
    }
  );
}

export default makeFilteredRows$;
