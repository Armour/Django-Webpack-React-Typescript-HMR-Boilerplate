// @flow

import React from 'react';

import 'css/index.scss';
import reZero from 'image/hello_world.png';


function App() {
  return (
    <div>
      <h1>Hello world!</h1>
      <img id="re-zero-1" alt="re-zero" />
      <img id="re-zero-2" src={reZero} alt="re-zero" />
    </div>
  );
}

export default App;
