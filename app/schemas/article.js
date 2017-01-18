import { Schema, arrayOf } from 'normalizr';

const article = arrayOf(new Schema('article', {
  idAttribute: 'url',
}));

export default article;
