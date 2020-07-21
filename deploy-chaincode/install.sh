#!/bin/sh
cc_folder=$1
label=$2

pushd ./chaincode/$cc_folder || exit
npm install
npm run build
popd

echo "Packaging chaincode ..."
docker exec -it cli peer lifecycle chaincode package $cc_folder.tar.gz  $cc_folder --lang node --label $label

echo "Installing chaincode ... "
# docker exec -it cli bash
docker exec -it cli peer lifecycle chaincode install $cc_folder.tar.gz


