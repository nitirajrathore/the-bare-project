FROM nitirajrathore/grpc-example-prebacked:latest
RUN mkdir -p /usr/app/grpc-example/grpc-server/libs
COPY grpc-server/target/grpc-server-*.jar /usr/app/grpc-example/grpc-server/libs
RUN mkdir -p /usr/app/grpc-example/grpc-server/bin
COPY grpc-server/config.yml /usr/app/grpc-example/grpc-server
COPY grpc-server/bin/grpc-server.sh /usr/app/grpc-example/grpc-server/bin
WORKDIR /usr/app/grpc-example/grpc-server/
ENV APP_LIBS_PATH /usr/app/grpc-example/grpc-server/libs
CMD sh bin/grpc-server.sh

