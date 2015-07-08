import Rx from 'rx';

function makeColumnWidths$(defaultColumnWidths$, containerWidth$) {
  return Rx.Observable.combineLatest(
    defaultColumnWidths$, containerWidth$,
    (defaultColumnWidths, containerWidth) => {
      let computation = defaultColumnWidths.reduce(function (agg, width) {
        if (typeof width === 'number') {
          agg.remainingWidth -= width;
          agg.autoSizeColumns -= 1;
        }
        return agg;
      }, {
        autoSizeColumns: defaultColumnWidths.length,
        remainingWidth: containerWidth
      });

      let standardWidth = computation.remainingWidth / computation.autoSizeColumns;

      return defaultColumnWidths.map(function (width) {
        if (width) {
          return width;
        } else {
          return standardWidth;
        }
      });
    }
  );
}

export default makeColumnWidths$;
