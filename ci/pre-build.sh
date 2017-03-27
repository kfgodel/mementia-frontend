#!/bin/bash

# Output commands as they execute
set -v

cd mementia-frontend
npm install
bower install
ember build --environment=production


# Prerequisitos
# wget -qO- https://deb.nodesource.com/setup_4.x | sudo bash -
# sudo apt-get install -y nodejs
# sudo apt-get install -y build-essential
# sudo npm install -g bower
# sudo npm install -g ember-cli