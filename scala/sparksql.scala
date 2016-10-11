
val df = sqlContext.read.json(System.getenv("HOME") + "/conferences/devfestnantes/data/people.json")

df.show()

df.printSchema()

df.select("name", "age").filter(col("age").gt(30)).show()

    
df.registerTempTable("people")
val sqlDF = sqlContext.sql("SELECT * FROM people")
sqlDF.show()

