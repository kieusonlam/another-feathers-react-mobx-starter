import { toJS } from 'mobx';
import initStore from '../stores';

/**
 Dehydrate (on server)
*/
export function dehydrate(store) {
  // convert store to json
  return toJS(store, true);
}

/**
  Rehydrate (on client)
*/
export function rehydrate() {
  // inject initial state into stores
  return initStore(window.__STATE);
}
