package net.codingdemon.grpc.example.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.dropwizard.Configuration;
import io.dropwizard.db.DataSourceFactory;
import io.dropwizard.grpc.client.GrpcChannelFactory;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

class ClientConfiguration extends Configuration {

  @Valid
  @NotNull
  private DataSourceFactory database = new DataSourceFactory();

  @JsonProperty("database")
  public DataSourceFactory getDataSourceFactory() {
    return database;
  }

  @JsonProperty("database")
  public void setDataSourceFactory(DataSourceFactory dataSourceFactory) {
    this.database = dataSourceFactory;
  }

  @Valid
  @NotNull
  private GrpcChannelFactory externalService = new GrpcChannelFactory();

  @JsonProperty("externalService")
  public GrpcChannelFactory getExternalGrpcChannelFactory() {
    return externalService;
  }

  @JsonProperty("externalService")
  public void setExternalGrpcChannelFactory(final GrpcChannelFactory externalService) {
    this.externalService = externalService;
  }
}