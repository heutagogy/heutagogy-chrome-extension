import NOT_FOUND from '../app/constants/Constants';

/* global __webpack_public_path__ __HOST__ __PORT__ */
/* eslint no-global-assign: 0 camelcase: 0 */

if (process.env.NODE_ENV === 'production') {
  __webpack_public_path__ = chrome.extension.getURL('/js/'); //eslint-disable-line
} else {
  // In development mode,
  // the iframe of injectpage cannot get correct path,
  // it need to get parent page protocol.
  const path = `//${__HOST__}:${__PORT__}/js/`;

  if (location.protocol === 'https:' || location.search.indexOf('protocol=https') !== NOT_FOUND) {
    __webpack_public_path__ = `https:${path}`; //eslint-disable-line
  } else {
    __webpack_public_path__ = `http:${path}`; //eslint-disable-line
  }
}
