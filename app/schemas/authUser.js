/* eslint-disable no-param-reassign */
/* eslint-disable fp/no-mutation */

import { Schema } from 'normalizr';
import moment from 'moment';
import { decodeUnicode } from './../utils/base64';

const options = {
  assignEntity(output, key, value, input) {
    const { access_token } = input;
    const data = JSON.parse(decodeUnicode(access_token.split('.')[1]));

    output.exp = moment.unix(data.exp).format();
  },
  idAttribute({ access_token }) {
    const data = JSON.parse(decodeUnicode(access_token.split('.')[1]));

    return data.identity;
  },
};

const user = new Schema('authUser', options);

export default user;
