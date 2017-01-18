import { jsdom } from 'jsdom';
import React from 'react';
import chrome from 'sinon-chrome';

global.document = jsdom('<!doctype html><html><body></body></html>'); //eslint-disable-line
global.window = document.defaultView; //eslint-disable-line
global.navigator = global.window.navigator; //eslint-disable-line
global.React = React; //eslint-disable-line
global.chrome = chrome; //eslint-disable-line
