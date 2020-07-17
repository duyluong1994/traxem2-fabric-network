#!/bin/sh
echo "Chaincode chaincode_name: $1; cc_package_id:$2 version: $3; sequence: $4"
chaincode_name=$1
CC_PACKAGE_ID=$2
version=$3
sequence=$4

# echo "Determining cc_package ID for chaincode"

# REGEX="Package ID: (.*), Label: $label"
# if [[ `docker exec -it cli peer lifecycle chaincode queryinstalled` =~ $REGEX ]]; then
#   CC_PACKAGE_ID=${BASH_REMATCH[1]}
#   echo $CC_PACKAGE_ID
# else
#   echo "Could not find cc_package ID for $label chaincode"
#   exit 1
# fi

echo "Approving smart contract"
docker exec -it cli peer lifecycle chaincode approveformyorg -C traxemchannel -n $chaincode_name -v $version --package-id $CC_PACKAGE_ID --sequence $sequence --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem
echo "Approved"

echo "Committing smart contract"
#(peerAddresses and tlsRootCertFiles if have more than 1 Org)
docker exec -it cli peer lifecycle chaincode commit -o orderer.traxem.vn:7050 -C traxemchannel -n $chaincode_name -v $version --sequence $sequence --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem
echo "Commited"
