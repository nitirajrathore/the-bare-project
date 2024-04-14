

Q: How to add the google/apis/annotations.proto so that it is available to your protos. 
A: as per [this](https://stackoverflow.com/questions/66168350/import-google-api-annotations-proto-was-not-found-or-had-errors-how-do-i-add), one way that worked for me was to copy the annotations.proto and http.proto to the root director of my app, like in this commit.