#!bin/bash
name="qrcode"
docker exec -it cli peer chaincode query -C traxemchannel -n $name -c '{"Args":["Org:get","6"]}'
docker exec -it cli peer chaincode query -C traxemchannel -n $name -c '{"Args":["Org:getAll"]}'
docker exec -it cli peer chaincode query -C traxemchannel -n $name -c '{"Args":["Traxem:query","{\"selector\":{\"_id\":{\"$regex\":\"^ORG\"}}}"]}'
# docker exec -it cli peer chaincode query -C traxemchannel -n $name -c '{"Args":["User:get","6"]}'
# docker exec -it cli peer chaincode query -C traxemchannel -n $name -c '{"Args":["Traxem:query","{\"selector\":{\"_id\":{\"$regex\":\"^USER\"}}}"]}'
# docker exec -it cli peer chaincode query -C traxemchannel -n $name -c '{"Args":["Media:get","6"]}'
# docker exec -it cli peer chaincode query -C traxemchannel -n $name -c '{"Args":["Traxem:query","{\"selector\":{\"_id\":{\"$regex\":\"^MEDIA\"}}}"]}'