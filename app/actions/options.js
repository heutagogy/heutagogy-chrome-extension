export const SAVE_OPTIONS = 'SAVE_OPTIONS';
export const saveOptions =
  ({ serverAddress, username, password }) => (dispatch) =>
  dispatch({ type: SAVE_OPTIONS, serverAddress, username, password });
