#!/bin/bash

SPARK_SHELL=$SPARK_HOME/bin/spark-shell

if [ $# == 0 ]
then
  declare -a scripts=($(ls scala/*.scala))
  for (( i=1; i<=${#scripts[@]}; i++ ));
  do
    echo "$i : ${scripts[$i-1]}"
  done
  echo "0 : quit"
  echo
  echo -n "Your choice > "
  read user_choice
  ! [[ $user_choice =~ ^-?[0-9]+$ ]] && exit
  [ $user_choice -lt 1 -o $user_choice -gt ${#scripts[@]} ] && exit
  SCRIPT=${scripts[$user_choice-1]}
else
  SCRIPT=$1
fi

if [ "$SCRIPT" != "" ]
then
  $SPARK_SHELL --master spark://$HOSTNAME:7077 -i $SCRIPT
fi
