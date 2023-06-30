/* eslint no-console: off */
const loggerMiddleware = () => (next) => (action) => {
  if (import.meta.env.DEV) {
    const { type, payload, meta, error } = action;

    console.groupCollapsed(type);
    console.log('Payload:', payload);
    if (error) {
      console.log('Error:', error);
    }
    console.log('Meta:', meta);
    console.groupEnd();
  }

  return next(action);
};

export default loggerMiddleware;
