For mongo there are no ODM or ORM that work well. So you will have to use[mongo-driver directly](https://www.mongodb.com/docs/drivers/go/current/usage-examples/)


## Start mongo

Start mongodb [docker](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-community-with-docker/)
```
docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
```


