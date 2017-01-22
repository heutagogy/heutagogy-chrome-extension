/* eslint-disable fp/no-let */
/* eslint-disable fp/no-mutation */
import { LOAD_ENTITIES_SUCCESS } from './../../actions/entity';
import { saveEntities } from './../../utils/localStorageUtils';

export default (state, action) => {
  switch (action.type) {
    case LOAD_ENTITIES_SUCCESS: {
      const entities = action.payload.get('entities');

      let result = state;

      entities.forEach((theEntities, entityType) => {
        theEntities.forEach((entity, entityId) => {
          result = result.mergeIn([entityType, entityId], entity);
        });
      });

      saveEntities(result);

      return result;
    }
    default: {
      return state;
    }
  }
};
