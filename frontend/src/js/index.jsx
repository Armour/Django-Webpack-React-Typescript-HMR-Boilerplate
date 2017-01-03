import React from 'react';
import ReactDom from 'react-dom';
import App from 'js/app';

import 'css/index.scss';


function main() {
    ReactDom.render(<App />, document.getElementById('root'));
}

main();

