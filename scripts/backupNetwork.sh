#!bin/bash
peer_folder=$1
peer_container=$2
cp -r ./crypto-config/ ./backup/
cp –r ./channel-artifacts/ backup/
mkdir ./backup/$peer_folder
docker cp $peer_container:/var/hyperledger/production/ ./backup/$peer_folder/
