#!/bin/sh
echo "building $1"

mkdir $1/
cp index.html $1/index.html
echo "<pre>$(cat $1.js | pygmentize -l javascript -f html) </pre>" >> $1/index.html
echo "<style>$(pygmentize -f html -S colorful)</style>" >> $1/index.html
browserify $1.js -o $1/out.js

