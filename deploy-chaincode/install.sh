#!bin/bash
cc_folder=$1
package_name=$2

pushd ./chaincode/$cc_folder
npm install
npm run build
popd

echo "Packaging chaincode ..."
docker exec -it cli peer lifecycle chaincode package $package_name.tar.gz -p /opt/gopath/src/github.com/chaincode/$cc_folder --lang node --label $package_name

echo "Installing chaincode..."
docker exec -it cli peer lifecycle chaincode install $package_name.tar.gz


