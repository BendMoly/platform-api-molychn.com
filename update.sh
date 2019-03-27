#!/bin/sh

unset GIT_DIR
DEPLOY_PATH="/root/api/"

echo "========updating code========"
cd $DEPLOY_PATH

#git tools
echo "updating git code to $DEPLOY_PATH"
git pull

sleep 5

make run