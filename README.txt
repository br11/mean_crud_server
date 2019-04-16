###########################################################################
###########################################################################
## mean_crud_server
## MEAN project - server-side CRUD auto generated
## By: br11 - Marcio Luis da Silva
###########################################################################
###########################################################################
# build and test
npm install
npm run grunt
node dist/main.js

# Build server app image
sudo docker build -t br11/mean_crud_server:0.0.2 .

# Edit docker-compose.yml to poit to the appropriate image tag

# Running stack 
sudo docker stack deploy -c docker-compose.yml mean

# Connects as admin to create application user in mean database
$ sudo docker container ps
$ sudo docker exec -it <mongo_container_name> mongo admin
  > use mean
  > db.createUser({ user: 'mean_crud_server', pwd: '123456', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });

# redeploy stack and check if db connection succeeded
$ sudo docker container ps
$ sudo docker container logs <server_app_container_id>

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

