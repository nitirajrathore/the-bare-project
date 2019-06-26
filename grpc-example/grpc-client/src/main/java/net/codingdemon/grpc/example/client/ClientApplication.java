package net.codingdemon.grpc.example.client;

import com.google.inject.Guice;
import com.google.inject.Injector;
import io.dropwizard.Application;
import io.dropwizard.setup.Environment;
import io.grpc.ManagedChannel;
import io.grpc.Server;
import lombok.extern.slf4j.Slf4j;
import net.codingdemon.grpc.example.common.RouteGuideUtil;
import net.codingdemon.grpc.example.common.proto.Feature;
import org.eclipse.jetty.server.session.SessionHandler;

import java.io.IOException;
import java.util.List;

@Slf4j
class ClientApplication extends Application<ClientConfiguration> {
  @Override
  public void run(final ClientConfiguration configuration, final Environment environment) throws IOException {
    final ManagedChannel externalServiceChannel = configuration.getExternalGrpcChannelFactory().build(environment);
    RouteChannel routeChannel = new RouteChannel(externalServiceChannel);
//    JdbiFactory factory = new JdbiFactory();
//    Jdbi jdbi = factory.build(environment, configuration.getDatabase(), "postgresql");
    Injector masterInjector = Guice.createInjector( new ClientModule(routeChannel));

    SessionHandler sessionHandler = new SessionHandler();
    environment.servlets().setSessionHandler(sessionHandler);

    // web resources
    environment.jersey().register(masterInjector.getInstance(RouteResource.class));
    environment.jersey().setUrlPattern("/api/*");
  }

  public static void main(String[] args) throws Exception {
    new ClientApplication().run(args);
  }
}
