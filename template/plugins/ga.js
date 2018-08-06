/* eslint-disable */

export default ({ app }) => {
    // Only on production mode and CSR
    (function(i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r;
      (i[r] =
        i[r] ||
        function() {
          (i[r].q = i[r].q || []).push(arguments);
        }),
        (i[r].l = 1 * new Date());
      (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
  
    // Add GA Code
    ga('create', '{{ GACode }}', 'auto');
  
    // @TODO : Change for Sentry
    // Each route change => push error to GA from client side
    app.router.afterEach((to, from) => {
      (function() {
        var originalWindowErrorCallback = window.onerror;
        window.onerror = function customErrorHandler(
          errorMessage,
          url,
          lineNumber,
          columnNumber,
          errorObject,
        ) {
          if (typeof ga === 'function') {
            var exceptionDescription = errorMessage;
            if (typeof errorObject !== 'undefined' && typeof errorObject.message !== 'undefined') {
              exceptionDescription = errorObject.message;
            }
            exceptionDescription += ' @ ' + url + ':' + lineNumber + ':' + columnNumber;
            var ga_js_error = {
              exDescription: to.fullPath + ' - ' + exceptionDescription + ' - ' + new Date(),
              exFatal: false,
              appName: '{{ name }}',
            };
  
            ga('send', 'exception', ga_js_error);
            ga('master.send', 'exception', ga_js_error);
          }
  
          if (typeof originalWindowErrorCallback === 'function') {
            return originalWindowErrorCallback(
              errorMessage,
              url,
              lineNumber,
              columnNumber,
              errorObject,
            );
          }
  
          return false;
        };
      })(window);
  
      // Push pageview to GA
      ga('set', 'page', to.fullPath);
      ga('send', 'pageview');
    });
  };
  