#!bin/bash
name="qrcode"
 docker exec -it cli peer chaincode invoke -o orderer.traxem.vn:7050 --tls true -C traxemchannel -n $name --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem -c '{"Args":["Org:set","[{\"id\":\"9\",\"name\":\"abcde\",\"orgId\":\"2\"}]"]}' --waitForEvent
# docker exec -it cli peer chaincode invoke -o orderer.traxem.vn:7050 --tls true -C traxemchannel -n $name --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem -c '{"Args":["User:set","[{\"id\":\"6\",\"name\":\"abcde\"}]"]}' --waitForEvent
# docker exec -it cli peer chaincode invoke -o orderer.traxem.vn:7050 --tls true -C traxemchannel -n $name --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem -c '{"Args":["Media:set","[{\"id\":\"6\",\"name\":\"abcde\"}]"]}' --waitForEvent
# docker exec -it cli peer chaincode invoke -o orderer.traxem.vn:7050 --tls true -C traxemchannel -n $name --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/traxem.vn/orderers/orderer.traxem.vn/msp/tlscacerts/tlsca.traxem.vn-cert.pem -c '{"Args":["Qrcode:set","[{\"code\":\"12\",\"updatedBy\":\"user1\"}]"]}' --waitForEvent