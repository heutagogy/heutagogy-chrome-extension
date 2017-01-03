export const getUser = (state) => {
  const user = state.getIn(['entities', 'authUser']);

  return user ? user.toList().first() : null;
};
