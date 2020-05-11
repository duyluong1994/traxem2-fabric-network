# traxem2-fabric-network

docker swarm init
docker swarm join-token manager
docker network create --attachable --driver overlay traxem-network

cryptogen generate --config=./crypto-config.yaml
export FABRIC_CFG_PATH=\$PWD
export CHANNEL_NAME=traxemchannel

mkdir channel-artifacts
configtxgen -profile TraxemMultiNodeEtcdRaft --channelID byfn-sys-channel --outputBlock ./channel-artifacts/genesis.block
configtxgen -profile OneOrgsChannel -outputCreateChannelTx ./channel-artifacts/channel.tx -channelID traxemchannel
configtxgen -profile OneOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/Org1MSPanchors.tx -channelID traxemchannel -asOrg Org1MSP

docker-compose -f host1.yaml up -d (run without couchdb)
docker-compose -f host1.yaml -f host_couch.yaml up -d
docker exec -it cli bash

peer channel create -o orderer.traxem.vn:7050 -c traxemchannel -f ./channel-artifacts/channel.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem

peer channel join -b traxemchannel.block
(CORE_PEER_MSPCONFIGPATH CORE_PEER_LOCALMSPID change if use for other Org)
CORE_PEER_ADDRESS="peer1.org1.traxem.vn:8051" CORE_PEER_TLS_ROOTCERT_FILE="/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.traxem.vn/peers/peer1.org1.traxem.vn/tls/ca.crt" peer channel join -b traxemchannel.block

### chaincode

docker cp fabcar 3809d70ba443:/opt/gopath/src/github.com/chaincode
peer lifecycle chaincode package fabcar.tar.gz -p /opt/gopath/src/github.com/chaincode/fabcar/go/ --lang golang --label fabcar_1

peer lifecycle chaincode install fabcar.tar.gz
peer lifecycle chaincode queryinstalled

export CC_PACKAGE_ID=fabcar_1:bf9d00f61f8cfa8e9ee7be925b103d0f23cc155cd8482bb04111e820b4037a00

CORE_PEER_ADDRESS="peer1.org1.traxem.vn:8051" CORE_PEER_TLS_ROOTCERT_FILE="/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.traxem.vn/peers/peer1.org1.traxem.vn/tls/ca.crt" peer lifecycle chaincode install fabcar.tar.gz

peer lifecycle chaincode approveformyorg -C traxemchannel -n fabcar -v 1.0 --package-id \$CC_PACKAGE_ID --sequence 1 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem

peer lifecycle chaincode checkcommitreadiness -C traxemchannel -n fabcar -v 1.0 --sequence 1 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem --output json

peer lifecycle chaincode querycommitted -C traxemchannel -n fabcar --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem --output json

(peerAddresses and tlsRootCertFiles if have more than 1 Org)
peer lifecycle chaincode commit -o orderer.traxem.vn:7050 -C traxemchannel -n fabcar -v 1.0 --sequence 1 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem

peer chaincode invoke -o orderer.traxem.vn:7050 --tls true -C \$CHANNEL_NAME -n fabcar --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem -c '{"Args":["initLedger"]}' --waitForEvent

peer chaincode query -C \$CHANNEL_NAME -n fabcar -c '{"Args":["queryCar","CAR0"]}'

peer chaincode invoke -o orderer.traxem.vn:7050 --tls true -C \$CHANNEL_NAME -n fabcar --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem -c '{"Args":["changeCarOwner","CAR0","Duy"]}'

peer chaincode query -C \$CHANNEL_NAME -n fabcar -c '{"Args":["queryCar","CAR0"]}'

# clean each host

docker-compose -f hostn.yaml down -v

# remove everything docker

docker kill $(docker ps -q)
docker rm $(docker ps -qa)
docker system prune -a
docker volume prune

# couchDB

http://localhost:5984/_utils
