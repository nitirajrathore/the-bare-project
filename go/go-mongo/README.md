For mongo there are no ODM or ORM that work well. So you will have to use[mongo-driver directly](https://www.mongodb.com/docs/drivers/go/current/usage-examples/)


## Start mongo

Start mongodb [docker](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-community-with-docker/)
```
docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
```

## Debug
Use this file for setting up debug configs in vscode : .vscode/launch.json

## Access the servers
After running the main.
Access servers : 
1. OpenAPI : http://localhost:8081
2. HTTP : using the [postman](https://www.postman.com/downloads/) UI 
          hit the url : localhost:8080/api/v1/echo
          with POST method + body content "raw" and select JSON or text 
          ```
          {
          "value": "Nitiraj"
          }
          ```
3. GRPC : Use postman itself to test grpc as well. Follow [this doc](https://learning.postman.com/docs/sending-requests/grpc/first-grpc-request/) to info or check its local version in this commit under `tutorial/` folder.