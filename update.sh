#!/bin/sh

unset GIT_DIR
DEPLOY_PATH="/root/api/"

echo "========updating code========"
cd $DEPLOY_PATH

#git tools
git pull
make run
