#!/bin/bash

sudo kill $(lsof -t -i:8080)
sudo kill $(lsof -t -i:3000)
sudo rm ./redbean.com
sudo make -j8 o//tool/net/redbean
sudo mv ./o/tool/net/redbean ./redbean.com
sudo zip ./redbean.com ./index.html
./redbean.com