#!/usr/bin/env bash

# check for CHROME_BIN env or just default
cmd=${CHROME_BIN:-/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome}

if [ -z "$1" ]
then
  echo "Usage: `basename $0` [url]"
  exit 1
fi

user_data=`mktemp -d -t profile`

"$cmd" --user-data-dir="$user_data" \
       --no-default-browser-check \
       --ignore-certificate-errors \
       --metrics-recording-only \
       --no-sandbox \
       --no-experiments \
       --disable-component-extensions-with-background-pages \
       --disable-background-networking \
       --disable-extensions \
       --disable-default-apps \
       --noerrdialogs \
       --no-default-browser-check \
       --disable-translate \
       --no-first-run \
       --js-flags="--trace-hydrogen --trace-phase=Z --trace-deopt --code-comments --hydrogen-track-positions --redirect-code-traces --trace_deopt --trace_opt" "$1"

rm -rf "$user_data"
