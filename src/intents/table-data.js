import Rx from 'rx';

let tableDataAction = new Rx.Subject();

export let setTableData = value => tableDataAction.onNext(value);

export let tableData$ = tableDataAction;
