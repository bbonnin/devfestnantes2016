#!/bin/bash

export ECLAIRJS_JAR=$HOME/tools/eclairjs/eclairjs-nashorn/target/eclairjs-nashorn-0.7-jar-with-dependencies.jar

SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

$HOME/tools/eclairjs/eclairjs-nashorn/bin/eclairjs.sh --master spark://$HOSTNAME:7077 --driver-java-options -Dlog4j.configuration=file:"$SCRIPT_PATH/log4j.prop" $*


