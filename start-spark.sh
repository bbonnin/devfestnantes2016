#!/bin/bash

export SPARK_MASTER_WEBUI_PORT=8077
export SPARK_WORKER_WEBUI_PORT=8078

$HOME/tools/spark/sbin/start-all.sh

sleep 5

google-chrome http://localhost:8077 &
