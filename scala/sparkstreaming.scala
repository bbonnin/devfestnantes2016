
import org.apache.spark.streaming._

val ssc = new StreamingContext(sc, Seconds(2))

val lines = ssc.socketTextStream("localhost", 9999)

val words = lines.flatMap(_.split(" "))
val counts = words.map(word => (word, 1)).reduceByKey(_ + _)
counts.print()

ssc.start()
ssc.awaitTermination()

