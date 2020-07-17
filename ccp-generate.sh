#!/bin/sh

one_line_pem() {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

json_ccp() {
    local PP=$(one_line_pem $5)
    local CP=$(one_line_pem $6)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${P1PORT}/$3/" \
        -e "s/\${CAPORT}/$4/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        ccp-template.json
}

ORG=1
P0PORT=7051
P1PORT=8051
CAPORT=7054
PEERPEM=crypto-config/peerOrganizations/org1.traxem.vn/tlsca/tlsca.org1.traxem.vn-cert.pem
CAPEM=crypto-config/peerOrganizations/org1.traxem.vn/ca/ca.org1.traxem.vn-cert.pem

echo "$(json_ccp $ORG $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > connection-profile.json
