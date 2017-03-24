#!/usr/bin/env bash
yarn clean
electron-packager . --all --ignore="(^(/bin|/dist)$)"

#does not reduce filesize...
#--ignore="(^(/bin|/src|/dist)$|node_modules/electron-(.*))"
