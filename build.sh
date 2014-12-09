#!/bin/sh
echo "building $1"

mkdir $1/
cp index.html $1/index.html
echo "<pre>$(cat $1.js) </pre>" >> $1/index.html
browserify $1.js -o $1/out.js
ssh og "mkdir ~/htdocs/$1"
scp -r $1 og:~/htdocs/

