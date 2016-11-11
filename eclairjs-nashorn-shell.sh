#!/bin/bash

export ECLAIRJS_JAR=$HOME/tools/eclairjs/eclairjs-nashorn/target/eclairjs-nashorn-0.7-jar-with-dependencies.jar

SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

$HOME/tools/eclairjs/eclairjs-nashorn/bin/eclairjs.sh --master spark://$HOSTNAME:7077 --driver-java-options -Dlog4j.configuration=file:"$SCRIPT_PATH/log4j.prop" --jars $HOME/.m2/repository/org/mongodb/mongo-hadoop/mongo-hadoop-core/1.5.1/mongo-hadoop-core-1.5.1.jar,$HOME/.m2/repository/org/mongodb/mongo-java-driver/3.2.2/mongo-java-driver-3.2.2.jar $*


