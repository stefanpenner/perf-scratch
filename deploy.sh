#!/bin/sh
./build.sh $1
browserify $1.js -o $1/out.js
ssh og "mkdir ~/htdocs/$1"
scp -r $1 og:~/htdocs/

