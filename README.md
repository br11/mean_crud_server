###########################################################################
###########################################################################
## mean_crud_server
## MEAN project - server-side CRUD auto generated
## By: br11 - Marcio Luis da Silva
###########################################################################
###########################################################################

#########################
## install & run
#########################
# Install
npm install
# Transpile
npm run grunt
# run 
node dist/main.js

#########################
## usage
#########################
POST: http://localhost:3002/api/audit_chat - saves a new document 
PUT : http://localhost:3002/api/audit_chat - updates an existing document 
DELETE: http://localhost:3002/api/audit_chat - deletes an existing document
GET: http://localhost:3002/api/audit_chat - retrieves the whole collection
GET: http://localhost:3002/api/audit_chat/:id – retrieves an existing document
GET: http://localhost:3002/api/audit_chat/lookup/<json_criteria> - retrieves the documents matching the given criteria

MongoDB Schema:
{
    name: String,
    period: { start: Date, end: Date },
    approval: { user: String, timestamp: Date, status: String }
}

Doc. exemplo:
{
    "_id" : ObjectId("5973aaa3d50805423c20d799"),
    "name" : "auditoria na casa do ze",
    "approval" : {
        "user" : "supervisor",
        "timestamp" : "2017-07-26T00:00:00",
        "status" : "OK"
    },
    "period" : {
        "start" : "2017-07-25T00:00:00",
        "end" : "2017-07-25T00:10:00"
    },
    "__v" : 0
}


POST: http://localhost:3002/api/audit_chat_message - saves a new document 
PUT : http://localhost:3002/api/audit_chat_message - updates an existing document 
DELETE: http://localhost:3002/api/audit_chat_message - deletes an existing document
GET: http://localhost:3002/api/audit_chat_message - retrieves the whole collection
GET: http://localhost:3002/api/audit_chat_message/:id - retrieves an existing document
GET: http://localhost:3002/api/audit_chat_message/lookup/:json_criteria  - retrieves the documents matching the given criteria

MongoDB Schema:
{
    chatId: Schema.Types.ObjectId,
    user: String, timestamp: Date, text: String
}

Doc. exemplo:
{
    "timestamp" : "2017-07-25T00:01:00",
    "user" : "vistoriador",
    "text" : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
   "_id" : ObjectId("5973aaa3d50805423c20d79a")
}


#########################
## Impllementing new routes
#########################

# Add the new module in src/app/routes


File: src\app\routes\user_profile\user_profile_model.ts

import { tpa, api } from '../../../foundation';
@tpa.Schema('user_profile', {
    nome: String,
    sobrenome: String,
    email: String,
    senha: String,
    status: String
})
@api.Path('user_profile')
export class UserProfileModel {
    nome: string;
    sobrenome: string;
    email: string;
    senha: string;
    status: String
}

export function init() {
    console.log('Initiating model for UserProfileModel');
    new UserProfileModel();
}
------

File: src\app\routes\user_profile\index.ts
------
export * from './user_profile_model';
------

> npm run grunt
> node dist/main.js

The following routes are now available:
  POST: http://localhost:3002/api/user_profile - saves a new document 
  PUT : http://localhost:3002/api/user_profile - updates an existing document 
  DELETE: http://localhost:3002/api/user_profile - deletes an existing document
  GET: http://localhost:3002/api/user_profile - retrieves the whole collection
  GET: http://localhost:3002/api/user_profile/:id - retrieves an existing document
  GET: http://localhost:3002/api/user_profile/lookup/:json_criteria  - retrieves the documents matching the given criteria

