
var mongoConfig = new org.apache.hadoop.conf.Configuration();
mongoConfig.set("mongo.input.uri", "mongodb://localhost:28100/test.in");

var SparkConf = require('eclairjs/SparkConf');
var SparkContext = require('eclairjs/SparkContext');


var conf = new SparkConf()
    .setAppName('EclairJS/Nashorn: mongo')
//    .setMaster('spark://' + java.lang.System.getenv('HOSTNAME') + ':7077');

var sc = new SparkContext(conf);


var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');


var jsc = sc.getJavaObject();

var documents = jsc.newAPIHadoopRDD(
    mongoConfig,                // Configuration
    com.mongodb.hadoop.MongoInputFormat.class,  // InputFormat
    java.lang.Object.class,            // Key type
    org.bson.BSONObject.class) 

var outputConfig = new org.apache.hadoop.conf.Configuration()
outputConfig.set("mongo.output.uri", "mongodb://localhost:28100/test.out")

documents.saveAsNewAPIHadoopFile(
    "file:///this-is-completely-unused",
    java.lang.Object.class,
    org.bson.BSONObject.class,
    com.mongodb.hadoop.MongoOutputFormat.class,
    outputConfig);


sc.stop();

