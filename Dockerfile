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

