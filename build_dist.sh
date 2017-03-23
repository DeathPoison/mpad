#!/usr/bin/env bash

rm -rf dist_*
rm -rf mPad-*
yarn run build
tar czf mPad-darwin-x64.tar.gz mPad-darwin-x64/
tar czf mPad-linux-armv7l.tar.gz mPad-linux-armv7l/
tar czf mPad-linux-ia32.tar.gz mPad-linux-ia32/
tar czf mPad-linux-x64.tar.gz mPad-linux-x64/
tar czf mPad-mas-x64.tar.gz mPad-mas-x64/
tar czf mPad-win32-ia32.tar.gz mPad-win32-ia32/
tar czf mPad-win32-x64.tar.gz mPad-win32-x64/
DISTNAME=dist_`date +%Y-%m-%d`
mkdir $DISTNAME
mv mPad*tar.gz $DISTNAME
rm -rf mPad-*
