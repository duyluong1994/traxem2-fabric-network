# traxem2-chaincode

## Deployment

1. Lifecycle chaincode
   ..\* run `sh ./deploy/install.sh <chaincode_name> <cc_folder>`
   ..\* inside cli-container run `peer lifecycle chaincode install <package>.tar.qz`
   ..\* run `sh ./deploy/approveAndCommit.sh <chaincode_name> <package> <version> <sequence>`

2. Ref
   ..\* docker exec -it cli bash
   ..\* peer lifecycle chaincode install <filename>.tar.gz
   ..\* peer lifecycle chaincode queryinstalled

   (package IDs are different)
   ..\* export CC_PACKAGE_ID=fabcar_1:bf9d00f61f8cfa8e9ee7be925b103d0f23cc155cd8482bb04111e820b4037a00

   ..\* CORE_PEER_ADDRESS="peer1.org1.traxem.vn:8051" CORE_PEER_TLS_ROOTCERT_FILE="/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.traxem.vn/peers/peer1.org1.traxem.vn/tls/ca.crt" peer lifecycle chaincode install fabcar.tar.gz

   ..\* peer lifecycle chaincode approveformyorg -C traxemchannel -n fabcar -v 1.0 --package-id \$CC_PACKAGE_ID --sequence 1 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem

   ..\* peer lifecycle chaincode checkcommitreadiness -C traxemchannel -n traxem2-qrcode -v 1.0 --sequence 1 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem --output json

   ..\* (peerAddresses and tlsRootCertFiles if have more than 1 Org)
   peer lifecycle chaincode commit -o orderer.traxem.vn:7050 -C traxemchannel -n traxem2-qrcode -v 1.0 --sequence 1 --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem

   ..\* peer lifecycle chaincode querycommitted -C traxemchannel -n traxem2-qrcode --tls true --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem --output json

   ..\* peer chaincode invoke -o orderer.traxem.vn:7050 --tls true -C traxemchannel -n traxem2-qrcode --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem -c '{"Args":["initLedger"]}' --waitForEvent

   ..\* peer chaincode query -C \$CHANNEL_NAME -n fabcar -c '{"Args":["queryCar","CAR0"]}'

   ..\* peer chaincode invoke -o orderer.traxem.vn:7050 --tls true -C \$CHANNEL_NAME -n fabcar --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem -c '{"Args":["changeCarOwner","CAR0","Duy"]}'

   ..\* peer chaincode query -C \$CHANNEL_NAME -n fabcar -c '{"Args":["queryCar","CAR0"]}'
