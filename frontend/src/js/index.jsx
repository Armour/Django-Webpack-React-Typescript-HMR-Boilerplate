import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from 'js/App';


ReactDom.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root'),
);

if (module.hot) {
    module.hot.accept('./App', () => {
        // noinspection Eslint
        const NextApp = require('js/App').default;
        ReactDom.render(
          <AppContainer>
            <NextApp />
          </AppContainer>,
          document.getElementById('root'),
        );
    });
    // document.querySelectorAll('link[href][rel=stylesheet]').forEach((link) => {
    //     const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`);
    //     link.href = nextStyleHref;
    // });
}
