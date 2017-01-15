// @flow

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

// Hot Reload Module API
if (module.hot) {
  // $FlowFixMe
  module.hot.accept('./App', () => {
    // $FlowFixMe
    const NextApp = require('js/App').default;
    ReactDom.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
