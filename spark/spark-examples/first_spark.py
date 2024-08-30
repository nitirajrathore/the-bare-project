from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("demo").getOrCreate()

df = spark.createDataFrame([
        ("sue", 32),
        ("li", 3),
        ("bob", 75),
        ("heo", 13),
    ],
    ["first_name", "age"],
)

#df.show()

from pyspark.sql.functions import col, when

df1 = df.withColumn("life_stage",
                    when(col("age") < 13, "child")
                    .when(col("age").between(13, 19), "teenager")
                    .otherwise("adult"),
                    )

df1.show()

# df.show()

df1.where(col("life_stage").isin(["teenager", "adult"])).show()

from pyspark.sql.functions import avg

df1.select(avg("age")).show()

df1.groupby("life_stage").avg().show()

## drop any existing table first -- this does not work as the table is not even registered yet.
# spark.sql("DROP TABLE if exists some_people")
# spark.catalog.dropTable("some_people")

import shutil

# remove the whole folder.
shutil.rmtree("spark-warehouse")

df1.write.saveAsTable("some_people")

spark.sql("select * from some_people").show()

spark.sql("insert into some_people values ('frank', 4, 'child')")

spark.sql("select * from some_people").show()

spark.sql("select * from some_people where life_stage = 'teenager'").show()

