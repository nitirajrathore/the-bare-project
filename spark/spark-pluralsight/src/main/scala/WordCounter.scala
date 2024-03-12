import org.apache.spark.{SparkConf, SparkContext}

object WordCounter {

  def main(args: Array[String]): Unit = {
    val conf = new SparkConf().setAppName("Word Counter")
    conf.setMaster("local[*]")
    val sc = new SparkContext(conf)
    val textFile = sc. textFile("/Users/nitirajrathore/opt/spark/README.md")
    val tokenizedFileData = textFile.flatMap(line => line.split(" "))
    val countPrep = tokenizedFileData.map(word => (word, 1))
    val counts = countPrep.reduceByKey((accumValue, newValue) => accumValue + newValue)
    val sortedCounts = counts.sortBy(kvPair => kvPair._2, false);

    sortedCounts.saveAsTextFile("file:///Users/nitirajrathore/rough/wordCounts")
  }

}
