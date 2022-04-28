# **SMSWithoutBorders Developer Console**

Please follow the steps below to get setup

## Install dependencies

```Bash
yarn install
```

## Configure environment variables

Create dev and production .env configs from the example.env template

```Bash
cp example.env .env.development.local

cp example.env .env.production.local

```

The .env file(s) contains all modifiable variables for each environment. Below are the defaults

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), which specifies variable naming conventions

* PORT -> development port
* REACT_APP_API_URL ->  Backend API URL
* REACT_APP_API_VERSION -> API version
* HTTPS -> Enable or disable https
* SSL_CRT_FILE -> Location of SSL CRT file
* SSL_KEY_FILE -> Location of SSL Key file

## Start development server

```bash
yarn start
```

Open [http://localhost:18900](http://localhost:18900) to view dashboard in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

## Create a production build

```bash
yarn build
```

Builds the app for production. Check the `build` folder for deployable files once complete.

## Deployment

For a Linux/Ubuntu server running apache2 web server, follow these steps to deploy the site

* Enable rewrite module
  
```bash
sudo a2enmod rewrite
```

* Open apache configuration file at /etc/apache2/apache2.conf
* Change the AllowOverride permission from none to all

```bash
<Directory /var/www/>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
</Directory>
```

* Copy contents of build folder to server root normally located at /var/www/html. Ensure the .htaccess file is copied over. The .htaccess file is quite important as specified [here](https://create-react-app.dev/docs/deployment/#static-server)

```bash
sudo cp -r build/. /var/www/html
```

* restart apache2

```bash
sudo systemctl restart apache2
```
