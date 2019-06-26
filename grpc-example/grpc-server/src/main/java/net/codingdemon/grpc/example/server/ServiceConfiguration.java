package net.codingdemon.grpc.example.server;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.dropwizard.Configuration;
import io.dropwizard.db.DataSourceFactory;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.Collections;
import java.util.Map;

class ServiceConfiguration extends Configuration {
    @Valid
    @NotNull
    private GrpcServerFactory grpcServer = new GrpcServerFactory();

    @JsonProperty("grpcServer")
    public GrpcServerFactory getGrpcServerFactory() {
        return grpcServer;
    }

    @JsonProperty("grpcServer")
    public void setGrpcServerFactory(final GrpcServerFactory grpcServer) {
        this.grpcServer = grpcServer;
    }

    @Valid
    @NotNull
    private DataSourceFactory database = new DataSourceFactory();

    @NotNull
    private Map<String, Map<String, String>> viewRendererConfiguration = Collections.emptyMap();

    @JsonProperty("database")
    public DataSourceFactory getDataSourceFactory() {
        return database;
    }

    @JsonProperty("database")
    public void setDataSourceFactory(DataSourceFactory dataSourceFactory) {
        this.database = dataSourceFactory;
    }

    @JsonProperty("viewRendererConfiguration")
    public Map<String, Map<String, String>> getViewRendererConfiguration() {
        return viewRendererConfiguration;
    }

    @JsonProperty("viewRendererConfiguration")
    public void setViewRendererConfiguration(Map<String, Map<String, String>> viewRendererConfiguration) {
        this.viewRendererConfiguration = viewRendererConfiguration;
    }

}