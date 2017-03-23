#!/usr/bin/env bash
yarn clean
electron-packager . --all --ignore="(^(/bin|/src|/dist)$|node_modules/electron-(.*))"
