#!/bin/bash
cc_folder=$1
label=$2

pushd ./chaincode/$cc_folder || exit
npm install
npm run build
popd

echo "Packaging chaincode ..."
docker exec -it cli peer lifecycle chaincode package $cc_folder.tar.gz -p /opt/gopath/src/github.com/chaincode/$cc_folder --lang node --label $label

echo "Installing chaincode ... "
# docker exec -it cli bash
docker exec -it cli peer lifecycle chaincode install $cc_folder.tar.gz


