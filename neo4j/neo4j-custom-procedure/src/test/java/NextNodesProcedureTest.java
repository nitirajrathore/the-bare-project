//import org.example.NextNodesProcedure;
//import org.junit.After;
//import org.junit.Before;
//import org.junit.Test;
//import org.neo4j.graphdb.GraphDatabaseService;
//import org.neo4j.graphdb.Node;
//import org.neo4j.graphdb.factory.GraphDatabaseFactory;
//import org.neo4j.harness.ServerControls;
//import org.neo4j.harness.TestServerBuilders;
//import org.neo4j.helpers.collection.Iterators;
//import org.neo4j.logging.Log;
//import org.neo4j.procedure.Mode;
//import org.neo4j.procedure.Procedure;
//import org.neo4j.procedure.ProcedureContext;
//import org.neo4j.procedure.UserFunction;
//
//import java.io.File;
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.List;
//
//import static org.junit.Assert.assertEquals;
//
//public class NextNodesProcedureTest {
//
//    private ServerControls serverControls;
//    private GraphDatabaseService graphDb;
//
//    @Before
//    public void setUp() {
//        serverControls = TestServerBuilders.newInProcessBuilder(new File("target/test-server"))
//                .withProcedure(NextNodesProcedure.class)
//                .newServer();
//        graphDb = serverControls.graph();
//    }
//
//    @After
//    public void tearDown() {
//        if (serverControls != null) {
//            serverControls.close();
//        }
//    }
//
//    @Test
//    public void testGetNextNodes() {
//        // Given
//        graphDb.executeTransactionally("CREATE (:Node)-[:RELATION]->(:Node)-[:RELATION]->(:Node)");
//
//        NextNodesProcedure procedure = new NextNodesProcedure();
//
//        // When
//        List<Node> nodes = new ArrayList<>();
//        graphDb.executeTransactionally("MATCH (n) RETURN n").forEachRemaining(row -> nodes.add((Node) row.get("n")));
//        List<Node> result = procedure.getNextNodes(nodes, "RELATION", "OUTGOING", graphDb);
//
//        // Then
//        assertEquals(1, result.size());
//    }
//}
