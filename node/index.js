var express = require('express');


var app = express();
app.use(express.static('public'));

var server = app.listen(process.env.PORT || 8088, function () {
});

var eclairjs = require('eclairjs');

app.get('/do', function (req, res) {
  var spark = new eclairjs();
  var sc = new spark.SparkContext("local[*]", "Simple Spark Program");

  var rdd = sc.parallelize([1.10, 2.2, 3.3, 4.4]);

  var rdd2 = rdd.map(function(num) {
    return num * 2;
  });

  rdd2.collect().then(function(results) {
    sc.stop();
    res.json({result: results});
  }).catch(function(err) {
    sc.stop();
    res.json({error: err});
  });
});


var eclairjs = require('eclairjs');
var spark = new eclairjs();
var Tuple2 = spark.Tuple2;


function run(sparkContext) {

    var file = ((typeof args !== "undefined") && (args.length > 1)) ? args[1] : "/home/inkdb/conferences/devfestnantes/data/dream.txt";


    var lines = sparkContext.textFile(file).cache();


    var words = lines
        .flatMap(function (line) {
            return line.split(" ");
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


    return counts.take(10);
}



var conf = new spark.SparkConf()
    .setAppName("JavaScript word count")
    .setMaster("spark://inkdb-VirtualBox:7077")
    ;
var sc = new spark.SparkContext("spark://inkdb-VirtualBox:7077", "NodeJS word count");
var result = run(sc);
result.then(function(results) {
    sc.stop();
    console.log("First 10 words = " + results);
//    res.json({result: results});
  }).catch(function(err) {
    sc.stop();
    console.log(err);
//    res.json({error: err});
  });


