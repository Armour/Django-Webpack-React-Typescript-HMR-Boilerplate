# Django-Webpack-React-Typescript-HMR-Boilerplate
[![Dependency Status](https://gemnasium.com/badges/859f8694be0794a67d3a461d8d714091.svg)](https://gemnasium.com/github.com/Armour/Django-Webpack-React-Typescript-HMR-Boilerplate)

## Install && Run

### Prerequisite

* `yarn` (or `npm`)
* `python 3` with `virtualenv`
* `postgresql` (or other database that you want)

##### On Mac OS:

~~~bash
brew update
brew install yarn
brew install postgresql
~~~

##### On Ubuntu:

Install [yarn](https://yarnpkg.com/en/docs/install#linux-tab) follows official documentation.

~~~bash
sudo apt-get update
sudo apt-get install yarn
sudo apt-get install postgresql
~~~


### Install project dependencies

Go to project root directory:

~~~bash
yarn install
yarn global add gulp
~~~

If you meet permission problem for global install, check [this](https://github.com/yarnpkg/yarn/issues/1060#issuecomment-268160528) out.


### Set up python virtual environment

If you don't have python 3.6.0 installed, you can choose to use [pyenv](https://github.com/yyuu/pyenv)

~~~bash
brew install pyenv
pyenv install 3.6.0
pyenv local 3.6.0
~~~

After that, create a virtual python environment using python 3.6.0, naming the folder as `pyenv` which has been added to `.gitignore`


~~~bash
pip install virtualenv
virtualenv -p python3 pyenv
source pyenv/bin/activate
pip install -r backend/requirements.txt
~~~

### Customize your django setting

~~~bash
vim backend/project_name/settings.py
~~~

You probably want to change:

1. Database
2. Timezone
3. Cache Method
4. Others

(if you are using `postgresql`, then the default setting is good to go, otherwise you may need to install database driver for your own database)


### Run gulp with webpack to generate bundle assets

**On development (with react-hot-reload):**

~~~bash
gulp
~~~

**On production (with uglify-js and other optimazitions):**

~~~bash
gulp --env production
~~~


### Run django backend server

~~~bash
cd backend
~~~

**On development:**

~~~bash
vim project_name/settings.py
~~~

Set `DEBUG` to `True` (Default)

~~~bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
~~~

**On production:**

~~~bash
vim project_name/settings.py
~~~

Set `DEBUG` to `False`

~~~bash
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic
python manage.py runserver 0.0.0.0:8000
~~~

Don't forget to setup Apache or Nginx with Django to support static files on production env.

### Backend

### Frontend

### Setup tutorial step by step

### Future work

### License

GNU License
