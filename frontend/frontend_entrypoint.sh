#!/bin/bash

DIR="/usr/app/src/dapp"
if [ ! -d $DIR ];then
    cd /usr/app/src
    echo -e "\n===> creating a react.js project\n"
    npx create-react-app dapp
    cd /usr/app/src/dapp
    echo -e "\n===> installing UI tools & web3.js\n"
    npm install web3@1.2.4 websocket@1.0.30 @material-ui/core @material-ui/icons axios@0.19.1 react-router@5.1.2 react-router-dom@5.1.2 onsenui@2.10.10 react-onsenui auth0-js@9.12.2 http-proxy-middleware@0.20.0
    echo -e "\n===> Stand by OK!!\n"
fi

DIR_Modules="/usr/app/src/dapp/node_modules"
if [ ! -d $DIR_Modules ];then
    cd /usr/app/src/dapp
    echo -e "\n===> installing UI tools & web3.js\n"
    npm install
    echo -e "\n===> Stand by OK!!\n"
fi
/bin/bash

#cd $DIR
#npm start