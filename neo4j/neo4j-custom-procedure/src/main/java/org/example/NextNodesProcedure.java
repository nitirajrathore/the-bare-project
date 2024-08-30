//package org.example;
//
//import org.neo4j.graphdb.*;
//import org.neo4j.procedure.Description;
//import org.neo4j.procedure.Name;
//import org.neo4j.procedure.UserFunction;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.stream.Stream;
//
//public class NextNodesProcedure {
//
//    @UserFunction
//    @Description("Finds the next set of nodes given a list of nodes and a relationship type")
//    public Stream<GNode> getNextNodes(
//            @Name("nodes") List<Node> nodes,
//            @Name("relationshipType") String relationshipType,
//            @Name("direction") String direction,
//            @Name("db") Object db) {
//
//        List<Node> nextNodes = new ArrayList<>();
//
//        try (Transaction tx = ((GraphDatabaseService) db).beginTx()) {
//            for (Node node : nodes) {
//                Iterable<Relationship> relationships = node.getRelationships(Direction.valueOf(direction), RelationshipType.withName(relationshipType));
//                for (Relationship relationship : relationships) {
//                    Node otherNode = relationship.getOtherNode(node);
//                    if (!nextNodes.contains(otherNode)) {
//                        nextNodes.add(otherNode);
//                    }
//                }
//            }
//            tx.commit();
//        }
//
//        return nextNodes.stream().map(n -> new GNode(n.getElementId(), nullOrString(n.getProperty("name")), nullOrString(n.getProperty("id"))));
//    }
//
//    private String nullOrString(Object obj) {
//        return obj == null? null : obj.toString();
//    }
//}
