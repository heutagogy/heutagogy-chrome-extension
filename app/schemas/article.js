import { Schema } from 'normalizr';

const article = new Schema('article', {
  idAttribute: 'url',
});

export default article;
