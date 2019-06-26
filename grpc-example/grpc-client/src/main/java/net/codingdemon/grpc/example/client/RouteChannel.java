package net.codingdemon.grpc.example.client;

import io.grpc.CallOptions;
import io.grpc.ClientCall;
import io.grpc.ManagedChannel;
import io.grpc.MethodDescriptor;

import java.util.concurrent.TimeUnit;

public class RouteChannel extends ManagedChannel {
  private ManagedChannel managedChannel;

  public RouteChannel(ManagedChannel managedChannel){
    this.managedChannel = managedChannel;
  }

  public ManagedChannel shutdown() {
    return managedChannel.shutdown();
  }

  public boolean isShutdown() {
    return managedChannel.isShutdown();
  }

  public boolean isTerminated() {
    return managedChannel.isTerminated();
  }

  public ManagedChannel shutdownNow() {
    return managedChannel.shutdownNow();
  }

  public boolean awaitTermination(long timeout, TimeUnit unit) throws InterruptedException {
    return managedChannel.awaitTermination(timeout, unit);
  }

  public <RequestT, ResponseT> ClientCall<RequestT, ResponseT> newCall(MethodDescriptor<RequestT, ResponseT> methodDescriptor, CallOptions callOptions) {
    return managedChannel.newCall(methodDescriptor, callOptions);
  }

  public String authority() {
    return managedChannel.authority();
  }
}
