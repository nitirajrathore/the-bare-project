from pyspark.sql import SparkSession

# Create a SparkContext
from pyspark import SparkContext

sc = SparkContext("local", "example")

# Create a SparkSession from SparkContext
spark = SparkSession(sc)
#
# # Create a SparkConf
# conf = SparkConf().setAppName("example")
#
# # Create a SparkContext
# sc = SparkContext(conf=conf)


text_file = spark.sparkContext.textFile("some_text.txt")

counts = (text_file.flatMap(lambda line: line.split(" "))
          .map(lambda word: (word, 1))
          .reduceByKey(lambda a, b: a + b)
          )

counts.collect()
