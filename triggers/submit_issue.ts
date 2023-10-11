import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerContextData, TriggerTypes } from "deno-slack-api/mod.ts";
import SubmitIssueWorkflow from "../workflows/submit_issue.ts";

const wordleChannel = "C123ABC456";

/**
 * Triggers determine when workflows are executed. A trigger
 * file describes a scenario in which a workflow should be run,
 * such as a user pressing a button or when a specific event occurs.
 * https://api.slack.com/automation/triggers
 */
const pasteScore: Trigger<typeof SubmitIssueWorkflow.definition> = {
  type: TriggerTypes.Event,
  name: "Connections response",
  description: "responds to user pasting Connections score",
  workflow: "#/workflows/submit_issue",
  event: {
    event_type: TriggerEventTypes.MessagePosted,
    channel_ids: [wordleChannel],
    filter: {
      version: 1,
      root: {
        statement: "{{data.text}} CONTAINS 'Connections' AND {{data.text}} CONTAINS 'Puzzle'"
      }
    }
  },
  inputs: {
    stringtoSend: {
      value: "Test 123",
    },
    channel: {
      value: wordleChannel,
    },
  },
};

export default submitIssue;
