import Immutable from 'immutable';
import { normalize } from 'normalizr';
import { NOT_FOUND, EMPTY_VALUE } from './../constants/Constants';

const hash = {
};

class SchemaUtils {
  getSuccessActionTypeWithSchema({ type, meta, schema }) {
    return {
      type,
      meta,
      payload: (action, state, res) => {
        const contentType = res.headers.get('Content-Type');

        if (contentType && contentType.indexOf('json') !== NOT_FOUND) {
          return res.json().then((json) => {
            const mappedData = (hash[meta.mapperType] && hash[meta.mapperType](json)) || json;

            return Immutable.fromJS(normalize(mappedData, schema));
          });
        }

        return EMPTY_VALUE;
      },
    };
  }
}

const schemaUtils = new SchemaUtils();

export default schemaUtils;
