export const getHttpHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `JWT ${token}`,
});
