#!/usr/bin/env bash

SELF_DIR="$( cd "$( dirname "$0" )" && pwd )"

cd $SELF_DIR/..

rm -rf mPad-*
yarn run build
tar czf mPad-darwin-x64.tar.gz mPad-darwin-x64/
tar czf mPad-linux-armv7l.tar.gz mPad-linux-armv7l/
tar czf mPad-linux-ia32.tar.gz mPad-linux-ia32/
tar czf mPad-linux-x64.tar.gz mPad-linux-x64/
tar czf mPad-mas-x64.tar.gz mPad-mas-x64/
tar czf mPad-win32-ia32.tar.gz mPad-win32-ia32/
tar czf mPad-win32-x64.tar.gz mPad-win32-x64/
DISTNAME=`date +%Y-%m-%d`_`date +%s` #_`php -r "echo uniqid();"`
mkdir -p dist/$DISTNAME
mv mPad*tar.gz dist/$DISTNAME

cd $SELF_DIR
