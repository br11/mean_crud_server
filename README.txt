###########################################################################
###########################################################################
## mean_crud_server
## MEAN project - server-side CRUD auto generated
## By: br11 - Marcio Luis da Silva
###########################################################################
###########################################################################

Configuring database connection 
# starts mongodb container to admin operations 
$ sudo docker run --name mongodb -v ~/projects/mean_crud_server/data/db:/data/db -p 27017:27017 -d mongo:3.4.9
or
$ sudo docker start mongodb

# Connects as admin to create application user
$ sudo docker exec -it mongodb mongo admin
  > db.createUser({ user: 'mean_crud_server', pwd: '123456', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });
  
# Tests the application user 
$ sudo docker run -it --rm --link mongodb:mongo mongo:3.4.9 mongo -u mean_crud_server -p 123456 --authenticationDatabase admin mongodb/local
  > db.getName();

Stop mongodb container
$ sudo docker container stop mongodb

Running the application:
$ sudo docker-compose up


Available routes:
POST: http://localhost:3002/api/audit_chat_message/0 - saves a new document 
PUT : http://localhost:3002/api/audit_chat_message/:id - updates an existing document 
DELETE: http://localhost:3002/api/audit_chat_message/:id - deletes an existing document
GET: http://localhost:3002/api/audit_chat_message - retrieves the whole collection
GET: http://localhost:3002/api/audit_chat_message/:id - retrieves an existing document
GET: http://localhost:3002/api/audit_chat_message/lookup/:json_criteria  - retrieves the documents matching the given criteria

Testing:
# Inserting new document
curl -d \
  '{"timestamp" : "2017-07-25T00:01:00", "user" : "vistoriador", "text" : "hello chat"}' \
  -H "Content-Type: application/json" \
  -X POST http://localhost:8080/api/audit_chat_message/0
  
# Recovering a document
curl -d \
  '{"timestamp" : "2017-07-25T00:01:00", "user" : "vistoriador", "text" : "hello chat"}' \
  -H "Content-Type: application/json" \
  -X GET http://localhost:8080/api/audit_chat_message/<_id>



