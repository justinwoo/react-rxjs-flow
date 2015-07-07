import {scrollTop$} from './intents/user-scroll';
import {containerWidth$} from './intents/container-resize';

function intent() {
  let actions = {
    scrollTop$,
    containerWidth$
  };
  return actions;
}

export default intent;
