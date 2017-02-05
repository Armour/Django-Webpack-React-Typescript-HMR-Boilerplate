import React from 'react';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';

import Home from 'tsx/Home';
import Layout from 'tsx/Layout';
import Page1 from 'tsx/Page1';
import Page2 from 'tsx/Page2';

import 'js/bin/materialize.min';

import 'sass/index.scss';

export default () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Home}/>
        <Route path="/page1" component={Page1}/>
        <Route path="/page2" component={Page2}/>
      </Route>
    </Router>
  );
};
