import moment from 'moment';

export const isLoggedIn = (user) => {
  if (user.isEmpty() || !user.get('exp')) {
    return false;
  }

  const now = moment();

  return now.isSameOrBefore(moment(user.get('exp')));
};
