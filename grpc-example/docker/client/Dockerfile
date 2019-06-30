FROM nitirajrathore/grpc-example-prebacked:latest
RUN mkdir -p /usr/app/grpc-example/grpc-client/libs
COPY grpc-client/target/grpc-client-*.jar /usr/app/grpc-example/grpc-client/libs
RUN mkdir -p /usr/app/grpc-example/grpc-client/bin
COPY grpc-client/bin/grpc-client.sh /usr/app/grpc-example/grpc-client/bin
COPY grpc-client/config.yml /usr/app/grpc-example/grpc-client
WORKDIR /usr/app/grpc-example/grpc-client/
ENV APP_LIBS_PATH /usr/app/grpc-example/grpc-client/libs
CMD sh bin/grpc-client.sh

