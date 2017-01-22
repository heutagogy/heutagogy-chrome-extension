import { Schema } from 'normalizr';

const article = new Schema('article', {
  idAttribute: 'url',
  defaults: { state: true },
});

export default article;
