package net.codingdemon.grpc.example.client;

import lombok.extern.slf4j.Slf4j;
import net.codingdemon.grpc.example.common.RouteGuideUtil;
import net.codingdemon.grpc.example.common.proto.Feature;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.util.List;

@Slf4j
@Path("route")
public class RouteResource {
  private List<Feature> features;
  private RouteGuideClient client;

  /**
   * Issues several different requests and then exits.
   */
  @Inject
  public RouteResource(RouteGuideClient client) throws InterruptedException {
    this.client = client;
    try {
      features = RouteGuideUtil.parseFeatures(RouteGuideUtil.getDefaultFeaturesFile());
    } catch (IOException ex) {
      log.error("Error occurred.", ex);
    }
  }

  @Path("feature")
  @GET
  public Response getFeature(@QueryParam("lat") int lat, @QueryParam("lon") int lon) {
    // Looking for a valid feature
    log.info("Got feature request for : {} : {}" , lat, lon );
    client.getFeature(lat, lon);
    return Response.ok().build();
  }

  @Path("all-features")
  @GET
  public Response getAllFeature(@QueryParam("lat1") int lat1, @QueryParam("lon1") int lon1, @QueryParam("lat2") int lat2, @QueryParam("lon2") int lon2) {
    // Looking for a valid feature
    log.info("Got feature request for : {} : {}, {} : {}" , lat1, lon1, lat2, lon2);
    client.listFeatures(lat1, lon1, lat2, lon2);
    return Response.ok().build();
  }

  @Path("recordRoute")
  @GET
  public Response doRouteRecord(@QueryParam("points") int n) throws InterruptedException {
    // Looking for a valid feature
    log.info("Got points : {}" , n);
    client.recordRoute(this.features, n);
    return Response.ok().build();
  }
}
