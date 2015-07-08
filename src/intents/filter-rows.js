import Rx from 'rx';

let filterEvenRowsAction = new Rx.Subject();

export let getHandleFilterEvens = (currentFilterEvens) => {
  return () => filterEvenRowsAction.onNext(currentFilterEvens ? false : true);
}

export let filterEvenRows$ = filterEvenRowsAction;
