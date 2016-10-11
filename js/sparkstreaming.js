
function run(sqlContext) {

    var lines = ssc.socketTextStream('localhost', 9999, StorageLevel.MEMORY_AND_DISK_2);

    var words = lines
        .flatMap(function(x) {
            return x.split(/\s+/);
        });
    
    var wordCounts = words
        .mapToPair(function(s, Tuple2) {
            return new Tuple2(s, 1);
        }, [Tuple2])
        .reduceByKey(function(i1,i2) {
            return i1 + i2;
        });

    wordCounts.print();
}

var Tuple2 = require('eclairjs/Tuple2');
var StorageLevel = require('eclairjs/storage/StorageLevel');
var Duration = require('eclairjs/streaming/Duration');
var SparkConf = require('eclairjs/SparkConf');
var SparkContext = require('eclairjs/SparkContext');
var StreamingContext = require('eclairjs/streaming/StreamingContext');
    
var conf = new SparkConf()
    .setAppName('EclairJS/Nashorn: Spark Streaming')
//    .setMaster('spark://inkdb-VirtualBox:7077')
    ;

var ssc = new StreamingContext(conf, new Duration(2000));
  
run(ssc);
  
ssc.start();
ssc.awaitTermination();

