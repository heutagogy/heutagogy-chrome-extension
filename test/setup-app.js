import { jsdom } from 'jsdom';

global.document = jsdom('<!doctype html><html><body></body></html>'); //eslint-disable-line
global.window = document.defaultView; //eslint-disable-line
global.navigator = global.window.navigator; //eslint-disable-line
