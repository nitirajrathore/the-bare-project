//package org.example;
//
//import java.util.Objects;
//
//public class GNode {
//    private String neo4jId;
//    private String name;
//    private String id;
//
//    public GNode() {
//    }
//
//    public GNode(String neo4jId, String name, String id) {
//        this.neo4jId = neo4jId;
//        this.name = name;
//        this.id = id;
//    }
//
//    public String getNeo4jId() {
//        return neo4jId;
//    }
//
//    public void setNeo4jId(String neo4jId) {
//        this.neo4jId = neo4jId;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getId() {
//        return id;
//    }
//
//    public void setId(String id) {
//        this.id = id;
//    }
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        GNode gNode = (GNode) o;
//        return Objects.equals(id, gNode.id);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(id);
//    }
//
//    @Override
//    public String toString() {
//        return "GNode{" +
//                "neo4jId=" + neo4jId +
//                ", name='" + name + '\'' +
//                ", id='" + id + '\'' +
//                '}';
//    }
//}
