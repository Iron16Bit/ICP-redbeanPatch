#!/bin/bash

sudo kill -SIGKILL $(lsof -t -i:8080)
sudo kill -SIGKILL $(lsof -t -i:3000)
sudo kill -SIGKILL $(lsof -t -i:3030)
sudo rm ./redbean.com
sudo make -j8 o//tool/net/redbean
sudo mv ./o/tool/net/redbean ./redbean.com
sudo zip ./redbean.com ./index.html ./communicator.js
sudo cp ./redbean.com ./dist/p2p_redbean.com
./redbean.com