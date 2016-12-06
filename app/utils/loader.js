import { loadEntities as load } from '../actions/entity';
import article from '../schemas/article';

export const loadEntities = (store) => {
  load({
    href: '/bookmarks',
    schema: article,
  })(store.dispatch);
};
