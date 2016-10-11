
function run(sqlContext) {

    var df = sqlContext.read().json(java.lang.System.getenv('HOME') + '/conferences/devfestnantes2016/data/people.json');

    df.show();

    df.printSchema();
    
    df.select('name', 'age').filter(col('age').gt(30)).show();
    
    df.registerTempTable('people');

    var sqlDF = sqlContext.sql('SELECT * FROM people');
    sqlDF.show();

}

var col = require('eclairjs/sql/functions').col;
var SparkConf = require('eclairjs/SparkConf');
var SparkContext = require('eclairjs/SparkContext');
var SQLContext = require('eclairjs/sql/SQLContext');
    
var conf = new SparkConf()
    .setAppName("EclairJS/Nashorn: Spark SQL")
    ;
var sc = new SparkContext(conf);
var sqlContext = new SQLContext(sc);
    
run(sqlContext);
    
sc.stop();

