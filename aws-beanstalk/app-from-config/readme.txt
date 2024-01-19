With the current configs getting error : InstanceProfile not found for working.
To fix this using the Option_settings from this link to update the env.yaml : https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-cfg-manifest.html


--- 
There is one error coming in frontend : Instance ELB health is not available.
And there is no real connection between frontend and backend via a queue. So we need to add that.

`eb status` inside frontend gave error : "ERROR: WorkerQueueNotFound -"
printing process.env and checking if that works
Since I am using groups in eb, I have to now pass group (by using + at the end of environment name like worker+) in all eb commands via its `-g` parameter to properly
pickup the right group of environment in the parameter

The error `ERROR: WorkerQueueNotFound` is still showing

### Check if the worker queue url environment is set or not
-- the process.env if node-js contained our WORKERQUEUE with the sqs url.


### send message from frontend to worker.
- sqs lib : https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/sqs/
- send message API : https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/sqs/command/SendMessageCommand/


