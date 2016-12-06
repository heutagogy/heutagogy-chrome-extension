import { Schema, arrayOf } from 'normalizr';

const article = arrayOf(new Schema('article', {
  idAttribute: 'url',
  meta: { removeProps: ['id'] },
  defaults: { state: true },
}));

export default article;
