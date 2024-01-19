'use strict';
import {SQSClient, SendMessageCommand} from "@aws-sdk/client-sqs"; // ES Modules import

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
var count = 0;

async function sendPingToSQS(config, sqsUrl) {
// const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs"); // CommonJS import
  const client = new SQSClient(config);
  const input = { // SendMessageRequest
    QueueUrl: sqsUrl, // required
    MessageBody: "ping", // required
    DelaySeconds: Number(1),
    MessageAttributes: { // MessageBodyAttributeMap
      "<keys>": { // MessageAttributeValue
        StringValue: "STRING_VALUE",
        BinaryValue: "BLOB_VALUE",
        StringListValues: [ // StringList
          "STRING_VALUE",
        ],
        BinaryListValues: [ // BinaryList
          "BLOB_VALUE",
        ],
        DataType: "STRING_VALUE", // required
      },
    },
    MessageSystemAttributes: { // MessageBodySystemAttributeMap
      "<keys>": { // MessageSystemAttributeValue
        StringValue: "STRING_VALUE",
        BinaryValue: "BLOB_VALUE",
        StringListValues: [
          "STRING_VALUE",
        ],
        BinaryListValues: [
          "BLOB_VALUE",
        ],
        DataType: "STRING_VALUE", // required
      },
    },
    MessageDeduplicationId: "STRING_VALUE",
    MessageGroupId: "STRING_VALUE",
  };
  const command = new SendMessageCommand(input);
  const response = await client.send(command);
// { // SendMessageResult
//   MD5OfMessageBody: "STRING_VALUE",
//   MD5OfMessageAttributes: "STRING_VALUE",
//   MD5OfMessageSystemAttributes: "STRING_VALUE",
//   MessageId: "STRING_VALUE",
//   SequenceNumber: "STRING_VALUE",
// };
}

app.get('/', (req, res) => {
  count++;

  sendPingToSQS();

  res.send("ping sent to worker. current count = " + count);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
