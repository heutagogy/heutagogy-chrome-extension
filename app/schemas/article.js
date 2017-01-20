import { Schema, arrayOf } from 'normalizr';

const article = arrayOf(new Schema('article', {
  idAttribute: 'url',
  defaults: { state: true },
}));

export default article;
