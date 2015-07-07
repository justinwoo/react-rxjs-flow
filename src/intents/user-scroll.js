import Rx from 'rx';

let scrollAction = new Rx.Subject();

export let handleOnScroll = e => scrollAction.onNext(e);

export let scrollTop$ = scrollAction.map(
  e => e.target.scrollTop
);
