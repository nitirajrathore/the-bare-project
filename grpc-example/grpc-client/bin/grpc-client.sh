if [ -z "$APP_LIBS_PATH" ]
then
  APP_LIBS_PATH=target
fi

echo "APP_LIBS_PATH=$APP_LIBS_PATH"

java -cp $APP_LIBS_PATH/grpc-client-*.jar net.codingdemon.grpc.example.client.ClientApplication  server config.yml
