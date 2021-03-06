import api from './src/api';
import {
  encodeBase64,
  decodeBase64,
} from './src/base64';
import bindCustomEvent from './src/bindCustomEvent';
import createAction from './src/createAction';
import createReducer from './src/createReducer';
import dispatch from './src/dispatch';
import escapeHTML from './src/escapeHTML';
import machine from './src/machine';
import searchParams from './src/searchParams';
import storage from './src/storage';
import storageProxy from './src/storage/proxy';
import Subject, { Observer } from './src/subject';
import {
  templater,
  templaterAsync,
} from './src/templater';

storage.proxy = storageProxy;

export {
  api,
  encodeBase64,
  decodeBase64,
  bindCustomEvent,
  createAction,
  createReducer,
  dispatch,
  escapeHTML,
  machine,
  searchParams,
  storage,
  Subject,
  Observer,
  templater,
  templaterAsync,
};
