import { Schema } from 'normalizr';

const article = new Schema('article', {
  idAttribute: 'id',
});

export default article;
