val file = sc.textFile(System.getenv("HOME") + "/conferences/devfestnantes2016/data/dream.txt")

val words = file.flatMap(line => line.split(" ")).filter(word => word.trim.length > 0)

val counts = words.map(word => (word, 1)).reduceByKey(_ + _)
        
val top10 = counts.toArray.sortBy(_._2).reverse.take(10)

println(top10.mkString("\n"))

