#!/usr/bin/env bash

SELF_DIR="$( cd "$( dirname "$0" )" && pwd )"

cd $SELF_DIR/..

#yarn clean
rm -rf mPad-*
## do not delete dist ;)


#does not reduce filesize...
#--ignore="(^(/bin|/src|/dist)$|node_modules/electron-(.*))"

cd $SELF_DIR
