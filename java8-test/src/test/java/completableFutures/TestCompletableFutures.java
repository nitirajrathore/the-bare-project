package completableFutures;

import lombok.extern.slf4j.Slf4j;
import org.junit.Test;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

@Slf4j
public class TestCompletableFutures {

//public static Logger log = LogManager.getLogger();
  @Test
  public void testRunAsync() throws ExecutionException, InterruptedException {
    // Run a task specified by a Runnable Object asynchronously.
    CompletableFuture<Void> future = CompletableFuture.runAsync(new Runnable() {
      @Override
      public void run() {
        // Simulate a long-running Job
        try {
          TimeUnit.SECONDS.sleep(1);
        } catch (InterruptedException e) {
          throw new IllegalStateException(e);
        }
        log.info("I'll run in a separate thread than the main thread.");
      }
    });

    Void aVoid = future.get();
    log.info("after future get ");
  }

  @Test
  public void testSupplyAsync() throws ExecutionException, InterruptedException {
    CompletableFuture<String> future = CompletableFuture.supplyAsync( () -> {
      try {
        Thread.sleep(5000);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
      log.info("returning nitiraj");
      return "Nitiraj";
    });

    String s = future.get();
    log.info("Received : {}", s);

  }

  @Test
  public void testThenApply() throws ExecutionException, InterruptedException {
    CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
      log.info("returning nitiraj");
      return "Nitiraj";
    });

    CompletableFuture<String> future2 = future.thenApply((name -> {
      log.info("return greeting.");
      return "Hello " + name;
    }));

    String name = future.get();
    String greeting = future2.get();

    log.info(name);
    log.info(greeting);

  }
  @Test
  public void testThenApplyAsync() throws ExecutionException, InterruptedException {
    CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
      log.info("returning nitiraj");
      return "Nitiraj";
    });

    CompletableFuture<String> future2 = future.thenApplyAsync((name -> {
      log.info("return greeting.");
      return "Hello " + name;
    }));

    String name = future.get();
    String greeting = future2.get();

    log.info(name);
    log.info(greeting);

  }

  @Test
  public void testAnyOf() throws ExecutionException, InterruptedException {
    CompletableFuture<String> c1 = CompletableFuture.supplyAsync(() -> {
      try {
        Thread.sleep(3);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
      return "1";
    });
    CompletableFuture<String> c2 = CompletableFuture.supplyAsync(() -> {
      try {
        Thread.sleep(4);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
      return "2";
    });
    CompletableFuture<String> c3 = CompletableFuture.supplyAsync(() -> {
      try {
        Thread.sleep(2);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
      return "3";
    });


    CompletableFuture<Object> c = CompletableFuture.anyOf(c1, c2, c3);

    Object o = c.get();

    log.info("REceibved : {}", o);
  }



}
