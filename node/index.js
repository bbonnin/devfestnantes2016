// Express Init
//
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());
app.use(express.static('public'));
app.use(express.static('node_modules'));

var server = app.listen(process.env.PORT || 8088, () => {
});

// EclairJS Init
//
var eclairjs = require('eclairjs');
var spark = new eclairjs();
var Tuple2 = spark.Tuple2;
var sc = new spark.SparkContext('spark://127.0.1.1:7077', 'EclairJS/NodeJS');

// Routes definition
//

var nbCounts = 0;

app.get('/wordcount', (req, res) => {
//    var sc = new spark.SparkContext('local[*]', 'EclairJS/NodeJS: word count ' + (++nbCounts));

    var filename = process.env.HOME + '/conferences/devfestnantes2016/data/dream.txt';

    var lines = sc.textFile(filename).cache();

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

    var sortedCounts = counts
        .mapToPair(function (tuple, Tuple2) {
            return new Tuple2(tuple._2() + 0.0, tuple._1());
        }, [Tuple2])
        .sortByKey(false);

    sortedCounts.take(10)
    .then((results) => {
//        sc.stop();
        res.json({result: results});
    })
    .catch((err) => {
//        sc.stop();
        res.status(500).send(err);
    });
});

app.post('/sql', (req, res) => {
    var sqlContext = new spark.sql.SQLContext(sc);
    var df = sqlContext.read().json(process.env.HOME + '/conferences/devfestnantes2016/data/people.json');

    df.registerTempTable('people')
    .then(() => {
        var sqlDF = sqlContext.sql(req.body.query);
   
        sqlDF.collect().then(function(results) {
//            sc.stop();
            res.json({result: results});
        }).catch(function(err) {
//            sc.stop();
            res.status(500).send(err);
        })
    })
});


