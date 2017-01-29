import { loadEntities as load } from '../actions/entity';
import article from '../schemas/article';

export const loadEntities = (store) => {
  load({
    href: '/bookmarks?per_page=200',
    schema: article,
  })(store.dispatch);
};
