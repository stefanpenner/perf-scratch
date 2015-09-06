#!/bin/sh
./build.sh $1
browserify $1.js -o $1/out.js
ssh o "mkdir ~/htdocs/$1"
scp -r $1 o:~/htdocs/

