/*
 * Copyright 2015 The gRPC Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package net.codingdemon.grpc.example.client;

import com.google.common.annotations.VisibleForTesting;
import com.google.protobuf.Message;
import io.grpc.ManagedChannel;
import io.grpc.Status;
import io.grpc.StatusRuntimeException;
import io.grpc.stub.StreamObserver;
import lombok.extern.slf4j.Slf4j;
import net.codingdemon.grpc.example.common.RouteGuideUtil;
import net.codingdemon.grpc.example.common.proto.Feature;
import net.codingdemon.grpc.example.common.proto.Point;
import net.codingdemon.grpc.example.common.proto.Rectangle;
import net.codingdemon.grpc.example.common.proto.RouteGuideGrpc;
import net.codingdemon.grpc.example.common.proto.RouteGuideGrpc.RouteGuideBlockingStub;
import net.codingdemon.grpc.example.common.proto.RouteGuideGrpc.RouteGuideStub;
import net.codingdemon.grpc.example.common.proto.RouteNote;
import net.codingdemon.grpc.example.common.proto.RouteSummary;

import javax.inject.Inject;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

/**
 * Sample client code that makes gRPC calls to the server.
 */
@Slf4j
public class RouteGuideClient {
//  private static final Logger log = Logger.getLogger(RouteGuideClient.class.getName());

  private final ManagedChannel channel;
  private final RouteGuideBlockingStub blockingStub;
  private final RouteGuideStub asyncStub;

  private Random random = new Random();
  private TestHelper testHelper;

  /** Construct client for accessing RouteGuide server at {@code host:port}. */
//  public RouteGuideClient(String host, int port) {
//    this(ManagedChannelBuilder.forAddress(host, port).usePlaintext());
//  }

  /** Construct client for accessing RouteGuide server using the existing channel. */
  @Inject
  public RouteGuideClient(RouteChannel channel) {
    this.channel = channel;
    blockingStub = RouteGuideGrpc.newBlockingStub(channel);
    asyncStub = RouteGuideGrpc.newStub(channel);
  }

  public void shutdown() throws InterruptedException {
    channel.shutdown().awaitTermination(5, TimeUnit.SECONDS);
  }

  /**
   * Blocking unary call example.  Calls getFeature and prints the response.
   */
  public void getFeature(int lat, int lon) {
    log.info("*** GetFeature: lat={0} lon={1}", lat, lon);

    Point request = Point.newBuilder().setLatitude(lat).setLongitude(lon).build();

    Feature feature;
    try {
      feature = blockingStub.getFeature(request);
      if (testHelper != null) {
        testHelper.onMessage(feature);
      }
    } catch (StatusRuntimeException e) {
      log.warn("RPC failed: {0}", e.getStatus());
      if (testHelper != null) {
        testHelper.onRpcError(e);
      }
      return;
    }
    if (RouteGuideUtil.exists(feature)) {
      log.info("Found feature called \"{0}\" at {1}, {2}",
          feature.getName(),
          RouteGuideUtil.getLatitude(feature.getLocation()),
          RouteGuideUtil.getLongitude(feature.getLocation()));
    } else {
      log.info("Found no feature at {0}, {1}",
          RouteGuideUtil.getLatitude(feature.getLocation()),
          RouteGuideUtil.getLongitude(feature.getLocation()));
    }
  }

  /**
   * Blocking server-streaming example. Calls listFeatures with a rectangle of interest. Prints each
   * response feature as it arrives.
   */
  public void listFeatures(int lowLat, int lowLon, int hiLat, int hiLon) {
    log.info("*** ListFeatures: lowLat={0} lowLon={1} hiLat={2} hiLon={3}", lowLat, lowLon, hiLat,
        hiLon);

    Rectangle request =
        Rectangle.newBuilder()
            .setLo(Point.newBuilder().setLatitude(lowLat).setLongitude(lowLon).build())
            .setHi(Point.newBuilder().setLatitude(hiLat).setLongitude(hiLon).build()).build();
    Iterator<Feature> features;
    try {
      features = blockingStub.listFeatures(request);
      for (int i = 1; features.hasNext(); i++) {
        Feature feature = features.next();
        log.info("Result #" + i + ": {0}", feature);
        if (testHelper != null) {
          testHelper.onMessage(feature);
        }
      }
    } catch (StatusRuntimeException e) {
      log.warn("RPC failed: {0}", e.getStatus());
      if (testHelper != null) {
        testHelper.onRpcError(e);
      }
    }
  }

  /**
   * Async client-streaming example. Sends {@code numPoints} randomly chosen points from {@code
   * features} with a variable delay in between. Prints the statistics when they are sent from the
   * server.
   */
  public void recordRoute(List<Feature> features, int numPoints) throws InterruptedException {
    log.info("*** RecordRoute");
    final CountDownLatch finishLatch = new CountDownLatch(1);
    StreamObserver<RouteSummary> responseObserver = new StreamObserver<RouteSummary>() {
      public void onNext(RouteSummary summary) {
        log.info("Finished trip with {0} points. Passed {1} features. "
            + "Travelled {2} meters. It took {3} seconds.", summary.getPointCount(),
            summary.getFeatureCount(), summary.getDistance(), summary.getElapsedTime());
        if (testHelper != null) {
          testHelper.onMessage(summary);
        }
      }

      public void onError(Throwable t) {
        log.warn("RecordRoute Failed: {0}", Status.fromThrowable(t));
        if (testHelper != null) {
          testHelper.onRpcError(t);
        }
        finishLatch.countDown();
      }

      public void onCompleted() {
        log.info("Finished RecordRoute");
        finishLatch.countDown();
      }
    };

    StreamObserver<Point> requestObserver = asyncStub.recordRoute(responseObserver);
    try {
      // Send numPoints points randomly selected from the features list.
      for (int i = 0; i < numPoints; ++i) {
        int index = random.nextInt(features.size());
        Point point = features.get(index).getLocation();
        log.info("Visiting point {0}, {1}", RouteGuideUtil.getLatitude(point),
            RouteGuideUtil.getLongitude(point));
        requestObserver.onNext(point);
        // Sleep for a bit before sending the next one.
        Thread.sleep(random.nextInt(1000) + 500);
        if (finishLatch.getCount() == 0) {
          // RPC completed or errored before we finished sending.
          // Sending further requests won't error, but they will just be thrown away.
          return;
        }
      }
    } catch (RuntimeException e) {
      // Cancel RPC
      requestObserver.onError(e);
      throw e;
    }
    // Mark the end of requests
    requestObserver.onCompleted();

    // Receiving happens asynchronously
    if (!finishLatch.await(1, TimeUnit.MINUTES)) {
      log.warn("recordRoute can not finish within 1 minutes");
    }
  }

  /**
   * Bi-directional example, which can only be asynchronous. Send some chat messages, and print any
   * chat messages that are sent from the server.
   */
  public CountDownLatch routeChat() {
    log.info("*** RouteChat");
    final CountDownLatch finishLatch = new CountDownLatch(1);
    StreamObserver<RouteNote> requestObserver =
        asyncStub.routeChat(new StreamObserver<RouteNote>() {
          public void onNext(RouteNote note) {
            log.info("Got message \"{0}\" at {1}, {2}", note.getMessage(), note.getLocation()
                .getLatitude(), note.getLocation().getLongitude());
            if (testHelper != null) {
              testHelper.onMessage(note);
            }
          }

          public void onError(Throwable t) {
            log.warn("RouteChat Failed: {0}", Status.fromThrowable(t));
            if (testHelper != null) {
              testHelper.onRpcError(t);
            }
            finishLatch.countDown();
          }

          public void onCompleted() {
            log.info("Finished RouteChat");
            finishLatch.countDown();
          }
        });

    try {
      RouteNote[] requests =
          {newNote("First message", 0, 0), newNote("Second message", 0, 1),
              newNote("Third message", 1, 0), newNote("Fourth message", 1, 1)};

      for (RouteNote request : requests) {
        log.info("Sending message \"{0}\" at {1}, {2}", request.getMessage(), request.getLocation()
            .getLatitude(), request.getLocation().getLongitude());
        requestObserver.onNext(request);
      }
    } catch (RuntimeException e) {
      // Cancel RPC
      requestObserver.onError(e);
      throw e;
    }
    // Mark the end of requests
    requestObserver.onCompleted();

    // return the latch while receiving happens asynchronously
    return finishLatch;
  }

  /** Issues several different requests and then exits. */
//  public static void main(String[] args) throws InterruptedException {
//    List<Feature> features;
//    try {
//      features = RouteGuideUtil.parseFeatures(RouteGuideUtil.getDefaultFeaturesFile());
//    } catch (IOException ex) {
//      ex.printStackTrace();
//      return;
//    }
//
//    RouteGuideClient client = new RouteGuideClient("localhost", 8000);
//    try {
//      // Looking for a valid feature
//      client.getFeature(409146138, -746188906);
//
//      // Feature missing.
//      client.getFeature(0, 0);
//
//      // Looking for features between 40, -75 and 42, -73.
//      client.listFeatures(400000000, -750000000, 420000000, -730000000);
//
//      // Record a few randomly selected points from the features file.
//      client.recordRoute(features, 10);
//
//      // Send and receive some notes.
//      CountDownLatch finishLatch = client.routeChat();
//
//      if (!finishLatch.await(1, TimeUnit.MINUTES)) {
//        client.log.warn("routeChat can not finish within 1 minutes");
//      }
//    } finally {
//      client.shutdown();
//    }
//  }

//  private void log.info(String msg, Object... params) {
//    log.log(Level.INFO, msg, params);
//  }
//
//  private void log.warn(String msg, Object... params) {
//    log.log(Level.WARNING, msg, params);
//  }

  private RouteNote newNote(String message, int lat, int lon) {
    return RouteNote.newBuilder().setMessage(message)
        .setLocation(Point.newBuilder().setLatitude(lat).setLongitude(lon).build()).build();
  }

  /**
   * Only used for unit test, as we do not want to introduce randomness in unit test.
   */
  @VisibleForTesting
  void setRandom(Random random) {
    this.random = random;
  }

  /**
   * Only used for helping unit test.
   */
  @VisibleForTesting
  interface TestHelper {
    /**
     * Used for verify/inspect message received from server.
     */
    void onMessage(Message message);

    /**
     * Used for verify/inspect error received from server.
     */
    void onRpcError(Throwable exception);
  }

  @VisibleForTesting
  void setTestHelper(TestHelper testHelper) {
    this.testHelper = testHelper;
  }
}
