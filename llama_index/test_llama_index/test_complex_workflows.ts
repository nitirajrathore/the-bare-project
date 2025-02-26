import { Workflow, StartEvent, StopEvent, WorkflowEvent } from "@llamaindex/workflow";

class AEvent extends WorkflowEvent<string> {
  constructor(data: string) {
    super(data);
  }
}

class BEvent extends WorkflowEvent<number> {
  constructor(data: number) {
    super(data);
  }
}

class ResultEvent extends WorkflowEvent<string> {
  constructor(data: string) {
    super(data);
  }
}

type ContextData = {
  workflowName: string;
};

async function executeWokflow() {
  const contextData1: ContextData = { workflowName: 'multi_event_workflow' };

  const workflow1 = new Workflow<ContextData, string, string>();

  workflow1.addStep(
    {
      inputs: [StartEvent<string>],
      outputs: [StopEvent<string>],
    },
    async (context, startEvent) => {
      const input = startEvent.data;
      context.sendEvent(new AEvent(`Nitiraj`));
      context.sendEvent(new BEvent(10));
      const { data } = await context.requireEvent(ResultEvent);
      return new StopEvent(`${data} for workflow ${input}!`);
    }
  );

  workflow1.addStep({
    inputs: [AEvent, BEvent],
    outputs: [ResultEvent]
  }, async (
    context,
    aEvent,
    bEvent
  ) => {
    const a = aEvent.data;
    const b = bEvent.data;
    return new ResultEvent(`A: ${a}, B: ${b}`);
  });


  {
    const ret = await workflow1.run("xyz", contextData1);
    console.log(ret.data); // Hello, Alex!
  }

  // {
  //   const ret = await workflow.run("", contextData);
  //   console.log(ret.data); // Hello, World!
  // }
  console.log(contextData1.workflowName);
}

function main() {
  executeWokflow();
}

main();