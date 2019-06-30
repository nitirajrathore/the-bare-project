if [ -z "$APP_LIBS_PATH" ]
then
  APP_LIBS_PATH=target
fi

echo "APP_LIBS_PATH=$APP_LIBS_PATH"
java -cp $APP_LIBS_PATH/grpc-server-*.jar net.codingdemon.grpc.example.server.ServiceApplication server config.yml
