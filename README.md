# traxem2-fabric-network

docker swarm init
docker swarm join-token manager
docker network create --attachable --driver overlay traxem-network

cryptogen generate --config=./crypto-config.yaml
export FABRIC_CFG_PATH=\$PWD
mkdir channel-artifacts
configtxgen -profile SampleMultiNodeEtcdRaft --channelID byfn-sys-channel --outputBlock ./channel-artifacts/genesis.block
configtxgen -profile OneOrgsChannel -outputCreateChannelTx ./channel-artifacts/channel.tx -channelID traxemchannel
configtxgen -profile OneOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/Org1MSPanchors.tx -channelID traxemchannel -asOrg Org1MSP

docker-compose -f host1.yaml up -d
docker exec -it cli bash

peer channel create -o orderer.traxem.vn:7050 -c traxemchannel -f ./channel-artifacts/channel.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem

# remove everything docker

docker kill $(docker ps -q)
docker rm $(docker ps -qa)
docker system prune -a
docker volume prune
