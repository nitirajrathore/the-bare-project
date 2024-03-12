version := "0.1.0-SNAPSHOT"

scalaVersion := "2.11.12"

lazy val root = (project in file("."))
  .settings(
    name := "spark-pluralsight"
  )

libraryDependencies += "org.apache.spark" % "spark-core_2.11" % "2.4.5"

//libraryDependencies += "org.apache.spark" %% "spark-core" % "2.4.5"
