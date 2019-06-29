FROM centos:7
WORKDIR /usr/app
#RUN yum -y update
RUN yum install -y maven git java-1.8.0-openjdk
RUN git clone https://github.com/nitirajrathore/the-bare-project .
WORKDIR grpc-example
RUN mvn clean install
