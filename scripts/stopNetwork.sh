#!/bin/sh
docker-compose -f host1.yaml -f host_couch.yaml -f host_ca.yaml  stop
