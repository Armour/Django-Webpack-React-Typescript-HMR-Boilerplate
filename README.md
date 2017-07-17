# Django-Webpack-React-Typescript-HMR-Boilerplate

[![Build Status](https://travis-ci.com/Armour/Django-Webpack-React-Typescript-HMR-Boilerplate.svg?token=xzmwu2pcJ1tBo5AwTZV3&branch=master)](https://travis-ci.com/Armour/Django-Webpack-React-Typescript-HMR-Boilerplate)
[![Dependency Status](https://david-dm.org/Armour/Django-Webpack-React-Typescript-HMR-Boilerplate/status.svg)](https://david-dm.org/Armour/Django-Webpack-React-Typescript-HMR-Boilerplate)
[![DevDependency Status](https://david-dm.org/Armour/Django-Webpack-React-Typescript-HMR-Boilerplate/dev-status.svg)](https://david-dm.org/Armour/Django-Webpack-React-Typescript-HMR-Boilerplate?type=dev)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

### Unfortunately, this project is DEPRECATED

Please checkout [this one](https://github.com/Armour/express-webpack-react-redux-typescript-boilerplate) with Node.js support! :)

## Stack

- [x] [django](https://www.djangoproject.com/) - backend
- [x] [yarn](https://github.com/yarnpkg/yarn) - dependency manager
- [x] [gulp](https://github.com/gulpjs/gulp) - task runner
- [x] [materialize](http://materializecss.com/) - a modern responsive front-end framework based on Material Design
- [x] [sass](https://github.com/sass/sass) - CSS pre-processors
- [x] [postcss](https://github.com/postcss/postcss) - CSS post-processor
- [x] [webpack 2](https://github.com/webpack/webpack) - module bundler
- [x] [webpack-dev-server](https://github.com/webpack/webpack-dev-server) - provides fast in-memory access to the webpack assets for live reloading
- [x] followed [ES6 standard](https://github.com/lukehoban/es6features)
- [x] [babel](https://babeljs.io/) - compile ES6 to ES5
- [x] [react](https://facebook.github.io/react/) - building user interfaces
- [x] [react-hot-loader 3](https://github.com/gaearon/react-hot-loader) - hot module reload!
- [x] [react-router](https://github.com/ReactTraining/react-router) - routing
- [x] [react-redux](https://github.com/reactjs/react-redux) - the official react bindings for [redux](https://github.com/reactjs/redux) (a predictable state container for js apps)
- [x] [react-router-redux](https://github.com/reactjs/react-router-redux) - keep react-router and redux in sync
- [x] [Typescript](https://github.com/Microsoft/TypeScript) - a typed superset of javascript that scales
- [x] [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) - high quality TypeScript type definitions
- [x] [editorconfig](http://editorconfig.org/) - maintain consistent coding styles between different editors and IDEs
- [x] [eslint](http://eslint.org/) - lint javascript files (.js, .jsx)
- [x] [tslint](https://palantir.github.io/tslint/) - lint typescript files (.ts, .tsx)
- [x] [stylelint](https://stylelint.io/) - lint style files (.css, .scss)
- [x] [pylint](https://www.pylint.org/) - lint python files (.py)
- [x] [postgresql](https://www.postgresql.org/) - advanced open source database
- [x] [prismjs](https://github.com/PrismJS/prism) - code syntax highlight
- [x] [jest](https://facebook.github.io/jest/) - painless javascript testing
- [x] [coveralls](https://coveralls.io/) - test coverage
- [x] [husky](https://github.com/typicode/husky) - git hooks
- [x] [travis-ci](https://travis-ci.org/) - continuous integration tool for testing and deployment
- [ ] [docker](https://github.com/docker/docker) - the open-source application container engine

## Install && Run

### Prerequisite

- `node`
- `yarn` (recommended) or `npm`
- `python 3.6.0` and `virtualenv`
  - Tip: you can use `pyenv` to manage your different versions of python
- `postgresql` or other databases

Install [yarn](https://yarnpkg.com/en/docs/install#linux-tab) follows official documentation.

Install [pyenv](https://github.com/yyuu/pyenv) follows official documentation.

### Install project dependencies

Go to project root directory:

```bash
yarn
yarn global add gulp
bash patch.sh
```

If you meet permission problem when try to install yarn globally, check [this](https://github.com/yarnpkg/yarn/issues/1060#issuecomment-268160528) out.

### Set up python virtual environment

If you don't have python 3.6.0 installed, you can choose to use [pyenv](https://github.com/yyuu/pyenv)

```bash
brew install pyenv
pyenv install 3.6.0
pyenv local 3.6.0
```

After that, create a virtual python environment using python 3.6.0, naming the folder as `pyenv` which has been added to `.gitignore`

```bash
pip install virtualenv
virtualenv -p python3 pyenv
```

Source your virtualenv and install the required package through pip

```bash
source pyenv/bin/activate
pip install -r backend/requirements.txt
```

### Customize your django setting

```bash
vim backend/project_name/settings.py
```

You probably want to change:

1. Database Config
1. Timezone
1. Cache Method
1. Others

(if you are using `postgresql`, then create a user called `django` with `django` database, and the default setting is good to go, otherwise you may need to install database driver for your own database)

### Run gulp with webpack to generate bundle assets

**On development (with react-hot-reload):**

```bash
gulp
```

**On production (with uglify-js and other optimazitions):**

```bash
NODE_ENV=production gulp
```

### Run django backend server

```bash
cd backend
```

**On development:**

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

**On production:**

```bash
vim project_name/settings.py
```

Set `DEBUG` to `False`

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic
# Setup Apache or Nginx to support static files here
python manage.py runserver
```

### Run test

```bash
yarn test
```

### Code coverage

```bash
yarn coveralls
```

### License

MIT License
