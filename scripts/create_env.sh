#!/bin/sh

# config files
DEV_ENV_FILE=.env.development.local
PROD_ENV_FILE=.env.production.local

CONFIGS="\n
PORT=${PORT:-18900}\n
REACT_APP_API_URL=${SWOB_DEV_BE_HOST:-http://localhost:12000}\n
REACT_APP_API_VERSION=${SWOB_DEV_BE_VERSION:-v1}\n
HTTPS=${SWOB_DEV_SSL_ENABLE:-false}\n
SSL_CRT_FILE=${SWOB_DEV_SSL_CRT_FILE:-}\n
SSL_KEY_FILE=${SWOB_DEV_SSL_KEY_FILE:-}\n
"

# only recreate dev config if not exist
if ! [ -e $DEV_ENV_FILE ]; then
    echo -e $CONFIGS > $DEV_ENV_FILE
fi

# Always update prod config
echo -e $CONFIGS > $PROD_ENV_FILE
