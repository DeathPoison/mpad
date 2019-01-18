#!/usr/bin/env bash

SELF_DIR="$( cd "$( dirname "$0" )" && pwd )"

cd $SELF_DIR/..

#yarn clean
electron-packager . --all --ignore="(^(/bin|/dist)$)"

#does not reduce filesize...
#--ignore="(^(/bin|/src|/dist)$|node_modules/electron-(.*))"

cd $SELF_DIR
