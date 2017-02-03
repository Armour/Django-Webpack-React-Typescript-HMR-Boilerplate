import React from 'react';
import { Route, Router, browserHistory } from 'react-router';

import Custom from 'tsx/Custom';
import Layout from 'tsx/Layout';
import Page1 from 'tsx/Page1';
import Page2 from 'tsx/Page2';

import 'js/bin/materialize';

import 'sass/index.scss';

export default () => {
  return (
    <Layout>
      <Router history={browserHistory}>
        <Route path="/" component={Custom}/>
        <Route path="/page1" component={Page1}/>
        <Route path="/page2" component={Page2}/>
      </Router>
    </Layout>
  );
};
