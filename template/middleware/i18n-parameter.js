export default ({ isHMR, app, store, route, error, redirect, params }) => {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return;

  const locale = params.lang || 'en';

  if (store.state.locales.indexOf(locale) === -1) {
    return error({ message: 'This page could not be found.', statusCode: 404 });
  }

  app.i18n.locale = store.state.locale;

  // If route is /en/... -> redirect to /...
  if (locale === 'en' && route.fullPath.indexOf('/en') === 0) {
    return redirect(route.fullPath.replace(/^\/en/, ''));
  }
};
