package net.codingdemon.grpc.example.server;

import io.dropwizard.Application;
import io.dropwizard.setup.Environment;
import io.grpc.Server;
import net.codingdemon.grpc.example.common.proto.Feature;
import lombok.extern.slf4j.Slf4j;
import net.codingdemon.grpc.example.common.RouteGuideUtil;

import java.io.IOException;
import java.util.List;

@Slf4j
class ServiceApplication extends Application<ServiceConfiguration> {
  @Override
  public void run(final ServiceConfiguration configuration, final Environment environment) throws IOException {
    final Server grpcServer;
    List<Feature> features = RouteGuideUtil.parseFeatures(RouteGuideUtil.getDefaultFeaturesFile());
    grpcServer = configuration.getGrpcServerFactory()
        .builder(environment)
        .addService(new RouteGuideServer.RouteGuideService(features))
        .build();

    log.info("Server started, listening on " + configuration.getGrpcServerFactory().getPort());
  }

  public static void main(String[] args) throws Exception {
    new ServiceApplication().run(args);
  }
}
