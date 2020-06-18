module.exports = (msg, code, payload) => {
  const error = new Error(msg);
  error.statusCode = code;
  error.payload = payload;
  return error;
};
