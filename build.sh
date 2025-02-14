#!/bin/bash

sudo rm ./redbean.com
sudo make -j8 o//tool/net/redbean
sudo mv ./o/tool/net/redbean ./redbean.com