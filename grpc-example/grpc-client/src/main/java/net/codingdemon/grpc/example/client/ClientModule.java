package net.codingdemon.grpc.example.client;

import com.google.inject.AbstractModule;

public class ClientModule extends AbstractModule {

  private final RouteChannel routeChannel;

  public ClientModule(RouteChannel routeChannel) {
    this.routeChannel = routeChannel;
  }

  @Override
  protected void configure() {
    super.configure();
    bind(RouteChannel.class).toInstance(routeChannel) ;
  }
}
