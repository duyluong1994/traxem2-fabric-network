# traxem2-fabric-network

docker swarm init
docker swarm join-token manager
docker network create --attachable --driver overlay traxem-network

cryptogen generate --config=./config/crypto-config.yaml
export FABRIC_CFG_PATH=$PWD/config
export CHANNEL_NAME=traxemchannel

configtxgen -profile TraxemMultiNodeEtcdRaft --channelID byfn-sys-channel --outputBlock ./channel-artifacts/genesis.block
configtxgen -profile OneOrgsChannel -outputCreateChannelTx ./channel-artifacts/channel.tx -channelID traxemchannel
configtxgen -profile OneOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/Org1MSPanchors.tx -channelID traxemchannel -asOrg Org1MSP

docker-compose -f host1.yaml up -d
docker-compose -f host1.yaml -f host_couch.yaml up -d
docker-compose -f host1.yaml -f host_couch.yaml -f host_ca.yaml up -d

## create and join channel

docker exec -it cli bash 

docker exec -it cli peer channel create -o orderer.traxem.vn:7050 -c traxemchannel -f ./channel-artifacts/channel.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem

docker exec -it cli peer channel join -b traxemchannel.block

(CORE_PEER_MSPCONFIGPATH CORE_PEER_LOCALMSPID change if use for other Org)
docker exec -it -e CORE_PEER_ADDRESS="peer1.org1.traxem.vn:8051" -e CORE_PEER_TLS_ROOTCERT_FILE="/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.traxem.vn/peers/peer1.org1.traxem.vn/tls/ca.crt" cli peer channel join -b traxemchannel.block

## chaincode

peer lifecycle chaincode package fabcar.tar.gz -p /opt/gopath/src/github.com/chaincode/fabcar/go/ --lang golang --label fabcar_1

peer lifecycle chaincode install fabcar.tar.gz
peer lifecycle chaincode queryinstalled --output json

(package IDs are different)
export CC_PACKAGE_ID=fabcar_1:bf9d00f61f8cfa8e9ee7be925b103d0f23cc155cd8482bb04111e820b4037a00

CORE_PEER_ADDRESS="peer1.org1.traxem.vn:8051" CORE_PEER_TLS_ROOTCERT_FILE="/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.traxem.vn/peers/peer1.org1.traxem.vn/tls/ca.crt" peer lifecycle chaincode install fabcar.tar.gz

peer lifecycle chaincode approveformyorg -C traxemchannel -n qrcode -v 1.0 --package-id \$CC_PACKAGE_ID --sequence 1 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem

peer lifecycle chaincode checkcommitreadiness -C traxemchannel -n qrcode -v 1.0 --sequence 1 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem --output json

peer lifecycle chaincode querycommitted -C traxemchannel -n lixil_qrcode --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem --output json

(peerAddresses and tlsRootCertFiles if have more than 1 Org)
peer lifecycle chaincode commit -o orderer.traxem.vn:7050 -C traxemchannel -n lixil_qrcode -v 1.0 --sequence 1 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem

peer chaincode invoke -o orderer.traxem.vn:7050 --tls true -C traxemchannel -n lixil_qrcode --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem -c '{"Args":["Org:setOrgState","{\"id\":1,\"name\":\"Lupo Corp\"}"]}' --waitForEvent

peer chaincode query -C traxemchannel -n fabts2 -c '{"Args":["queryCar","CAR0"]}'

peer chaincode invoke -o orderer.traxem.vn:7050 --tls true -C \$CHANNEL_NAME -n fabcar --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem -c '{"Args":["changeCarOwner","CAR0","Duy"]}'

peer chaincode query -C \$CHANNEL_NAME -n fabcar -c '{"Args":["queryCar","CAR0"]}'

## Rest-Server
use ccp-generate.sh script to get connection-profile.json file

## clean each host

docker-compose -f hostn.yaml down -v
docker rmi $(docker images | awk '($1 ~ /dev-peer.\*/) {print \$3}')

## remove everything docker

docker kill $(docker ps -q)
docker rm $(docker ps -qa)
docker system prune -a
docker volume prune
docker container prune

## couchDB

http://localhost:5984/_utils

## TODO
- FIx bug when get History between linked and not linked carton body.
