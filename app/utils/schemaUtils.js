import Immutable from 'immutable';
import { normalize } from 'normalizr';
import { NOT_FOUND, EMPTY_VALUE } from './../constants/Constants';

class SchemaUtils {
  getSuccessActionTypeWithSchema({ type, schema, meta }) {
    return {
      type,
      meta,
      payload: (action, state, res) => {
        const contentType = res.headers.get('Content-Type');

        if (contentType && contentType.indexOf('json') !== NOT_FOUND) {
          return res.json().then((json) => Immutable.fromJS(normalize(json, schema)));
        }

        return EMPTY_VALUE;
      },
    };
  }
}

const schemaUtils = new SchemaUtils();

export default schemaUtils;
