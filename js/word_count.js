
function countWords(sparkContext) {
    var Tuple2 = require('eclairjs/Tuple2');

    var filename = java.lang.System.getenv('HOME') + '/conferences/devfestnantes2016/data/dream.txt';

    var lines = sparkContext.textFile(filename);

    var words = lines
        .flatMap(function (line) {
            return line.split(' ');
        })
        .filter(function (word) {
            return word.trim().length > 0;
        });
        
    var counts = words
        .mapToPair(function (word, Tuple2) {
            return new Tuple2(word, 1);
        }, [Tuple2])
        .reduceByKey(function (a, b) {
            return a + b;
        });

    var top10 = counts
        .mapToPair(function (tuple, Tuple2) {
            return new Tuple2(tuple._2() + 0.0, tuple._1());
        }, [Tuple2])
        .sortByKey(false)
        .take(10)

    return JSON.stringify(top10);
}

var SparkConf = require('eclairjs/SparkConf');
var SparkContext = require('eclairjs/SparkContext');

var conf = new SparkConf()
    .setAppName('EclairJS/Nashorn: word count')
//    .setMaster('spark://' + java.lang.System.getenv('HOSTNAME') + ':7077');

var sc = new SparkContext(conf);

var result = countWords(sc);

print("Top 10 words = " + result);

sc.stop();

