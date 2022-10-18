# forumService
The main focus of this project was to practice creating an AWS service from scratch with AWS sam template. 
The project includes openapi documentation and utilises Api gateway request validation.

## Resources
Resources include DynamoDB, RestAPI and AWS Lambda functions

## Architecture
The forum includes two dynamoDB tables. One table holds threads and another table holds replies. Reply object includes a thread ID and threads have an array of reply ID's. When a user posts a reply, the replyID of that reply is added to the array of replies of the thread.