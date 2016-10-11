#!/bin/bash

$HOME/tools/spark/sbin/start-all.sh

sleep 5

google-chrome http://localhost:8080 &
