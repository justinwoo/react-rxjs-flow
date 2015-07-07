import Rx from 'rx';

let containerResizeAction = new Rx.Subject();

export let setContainerWidth = value => containerResizeAction.onNext(value);

export let containerWidth$ = containerResizeAction;
