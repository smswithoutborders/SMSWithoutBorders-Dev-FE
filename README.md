# **SMSWithoutBorders Developer**


Please follow the steps below to get setup

### Install dependencies

```
npm install
```
### Set env variables

Create dev and production .env configs from the example.env template

```
cp example.env .env.development.local

cp example.env .env.production.local

```

.env file contains all modifiable system variables. Below are the defaults

```
PORT=18900  /* local development port */
REACT_APP_API_URL=http://localhost:9000 /* Dev API URL */
REACT_APP_DOCS_URL=https://raw.githubusercontent.com/smswithoutborders/SMSWithoutBorders-DevFE/master/README.md /* docs markdown file url */

```
### Start development server

```
npm start
```

Open [http://localhost:18900](http://localhost:18900) to view dashboard in the browser.

The page will reload when you make changes.

### Build for production

```
npm run build
```




