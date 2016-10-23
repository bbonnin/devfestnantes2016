# devfestnantes2016

Code and examples: https://github.com/EclairJS

## EclairJS

This tests have been run with EclairJS 0.7 (Spark 1.6 and Scala 2.10)

## Install

### NodeJS examples

```
cd node
npm install
```

### Jupyter

pip install jupyter

pip install toree==0.1.0.dev7

cp jupyter/kernel.json $HOME/.local/share/jupyter/kernels/eclair/


## Run

* Start Spark: `start-spark.sh`
* Start Jupyter: `$HOME/.local/bin/jupyter notebook`
* Test basic js examples: `eclairjs-nashorn-shell.sh <js/filename.js>`
* Test nodejs examples:
```
cd node
npm start
open browser http://hostname:8088
``` 
* Test scala examples: `run-scala-examples.sh`

