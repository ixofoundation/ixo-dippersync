#!/bin/bash

# git clone https://github.com/ixofoundation/ixo-dippersync.git
# cd ixo-dippersync

# Note: this script should be run from outside the bin folder

echo "***********************************"
echo "* IXO DIPPERSYNC                   *"
echo "***********************************"
echo ""
echo "Build ixo dippersync"
docker build -t ixofoundation/ixo-dippersync .

docker-compose up --no-start

docker-compose start dipper-sync

docker-compose logs --tail 13 dipper-sync
echo ""
echo "***********************************"
echo "* IXO DIPPERSYNC COMPLETE          *"
echo "***********************************"
docker-compose ps
