#!/bin/sh
./node_modules/.bin/esbuild ./src/App.js \
        --sourcemap \
        --loader:.js=jsx \
        --bundle \
        --define:process.env.NODE_ENV='"development"' \
        --outfile=public/bundle.js
