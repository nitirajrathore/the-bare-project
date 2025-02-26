import { StartEvent, StopEvent, Workflow, WorkflowEvent } from "@llamaindex/workflow";

type ContextData = {
  counter: number;
};

function main() {
  executeWorkflow(); // 2
}

async function executeWorkflow() {
  const contextData: ContextData = { counter: 0 };

  const workflow = new Workflow<ContextData, string, string>();

  class GreetingStartEvent extends WorkflowEvent<string> { }
  class GreetingStopEvent extends WorkflowEvent<string> { }

  workflow.addStep(
    {
      inputs: [GreetingStartEvent],
      outputs: [GreetingStopEvent],
    },
    async (context, startEvent) => {
      const input = startEvent.data;
      context.data.counter++;
      return new GreetingStopEvent(`${input} With Fold Hands:`);
    }
  );

  workflow.addStep(
    {
      inputs: [StartEvent<string>],
      outputs: [StopEvent<string>],
    },
    async (context, startEvent) => {
      const input = startEvent.data;
      context.sendEvent(new GreetingStartEvent(`Nitiraj`));
      context.data.counter++;
      const { data } = await context.requireEvent(GreetingStopEvent);
      return new StopEvent(`${data} Hello, ${input}!`);
    }
  );



  {
    const ret = await workflow.run("Alex", contextData);
    console.log(ret.data); // Hello, Alex!
  }

  {
    const ret = await workflow.run("World", contextData);
    console.log(ret.data); // Hello, World!
  }

  console.log(contextData.counter);
}

main();
