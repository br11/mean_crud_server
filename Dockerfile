FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app/mean_crud_server

# Install app dependencies
COPY dist/ /usr/src/app/mean_crud_server/ 
COPY node_modules/ /usr/src/app/mean_crud_server/node_modules/

# setting work directory
WORKDIR /usr/src/app/mean_crud_server

EXPOSE 8080
ENTRYPOINT ["node", "main.js"]
CMD  ["8080", "mongo:27017"]


#
#
#
#
#
#


# docker build -t br11/mean_crud_server .
# docker logs ce2b063a5187
# docker container ps

# docker run --name mongodb -v ./data/db:/data/db -p 27017:27017 -d mongo:3.4.9
# docker start mongodb

# docker run --name mean_server --link mongodb:mongo -p 8080:8080 br11/mean_crud_server 8080 mongo:27017
# docker start mean_server

# docker exec -it mongo mongo admin
# > db.createUser({ user: 'marcio', pwd: '123456', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });
# > db.createUser({ user: 'mean_crud_server', pwd: '123456', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });
# docker run -it --rm --link mongodb:mongo mongo mongo -u marcio -p 123456 --authenticationDatabase admin mongodb/local
# > db.getName();
