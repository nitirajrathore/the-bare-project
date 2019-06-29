FROM nitirajrathore/grpc-server-prebacked:latest
WORKDIR /usr/app/grpc-example
CMD git pull
RUN mvn clean install
WORKDIR grpc-client/
CMD sh bin/grpc-client.sh

