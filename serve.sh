#!/bin/sh
export NODE_OPTIONS=--openssl-legacy-provider
ng serve --port 3000 --host 0.0.0.0 --disable-host-check
