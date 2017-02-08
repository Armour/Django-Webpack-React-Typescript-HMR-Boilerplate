import React from 'react';
import { IndexRoute, Route } from 'react-router';

import Home from 'components/Home';
import Layout from 'components/Layout';
import Page1 from 'components/Page1';
import Page2 from 'components/Page2';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home}/>
    <Route path="/page1" component={Page1}/>
    <Route path="/page2" component={Page2}/>
  </Route>
);
