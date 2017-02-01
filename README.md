# Django-Webpack-React-Typescript-HMR-Boilerplate

## Install && Run

### Prerequisite

* `yarn` (or `npm`)
* `python 3` with `virtualenv`
* `postgresql` (or other databases)

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

You can safely ignore all the warnings during installation, as we are using some beta packages.

If you meet permission problem for global install, check [this](https://github.com/yarnpkg/yarn/issues/1060#issuecomment-268160528) out.

### Install typings for Typescript support

~~~bash
typings install
~~~


### Set up python virtual environment

~~~bash
pyenv install 3.6.0
pyenv local 3.6.0
~~~

~~~bash
pip install virtualenv
virtualenv -p python3 pyenv
source pyenv/bin/activate
pip install -r backend/requirements.txt
~~~

`pyenv` folder has been added to `.gitignore`


### Customize your django setting

~~~bash
vim backend/project_name/settings.py
~~~

1. Database
2. Timezone
3. Cache
4. Others

(if you are using `postgresql`, then the default setting is good to go)


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

Set `DEBUG` to `True`

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

Don't forget to setup Apache or Nginx with Django to support static files

### Backend

### Frontend

### Setup tutorial step by step

### Future work

### License

GNU License
