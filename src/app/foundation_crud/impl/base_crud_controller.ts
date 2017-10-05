import { Router, Request, Response } from 'express';

import { CrudService, BaseCrudService, CrudController } from '..';

export class BaseCrudController<T> implements CrudController<T> {

    private mock = false;

    private crudService: CrudService<T>;

    constructor(private router: Router, modelName: string, private path?: string) {
        this.crudService = new BaseCrudService<T>(modelName);
        if (!this.path) {
            this.path = modelName;
        }

        this.initroutes();
    }

    private initroutes() {
        this.router.get('/' + this.path+ '/lookup/:criteria', (request, response) => {
            console.log('Consultando tudo: ' + request.params.criteria);

            this.crudService.retrieveByCriteria(JSON.parse(request.params.criteria))
                .then((entities: T[]) => {
                    this.respond(response, entities);
                });

        }).get('/' + this.path, (request, response) => {
            console.log('Consultando tudo: ' + request.params.id);

            this.crudService.retrieveAll()
                .then((entities: T[]) => {
                    this.respond(response, entities);
                });

        }).get('/' + this.path + '/:id', (request, response) => {
            console.log('Consultando id: ' + request.params.id);

            this.crudService.retrieveById(request.params.id)
                .then((entity: T) => {
                    this.respond(response, entity);
                });

        }).post('/' + this.path + '/:id', (request, response) => {
            console.log('Criando id ' + request.params.id);

            this.readData(request)
                .then((entity: T) => {
                    return this.crudService.create(entity);
                })
                .then((entity: T) => {
                    this.respond(response, entity);
                });

        }).put('/' + this.path + '/:id', (request, response) => {
            console.log('Atualizando id ' + request.params.id);

            this.readData(request)
                .then((entity: T) => {
                    return this.crudService.update(entity);
                })
                .then((entity: T) => {
                    this.respond(response, entity);
                });

        }).delete('/' + this.path + '/:id', (request, response) => {
            console.log('Excluind id ' + request.params.id);

            this.readData(request)
                .then((entity: T) => {
                    return this.crudService.delete(entity);
                })
                .then((entity: T) => {
                    this.respond(response, entity);
                });

        }).get('/' + this.path + '/teste/:id', (request, response) => {
            console.log('Rota de teste Login');

            this.readDataMock(request)
                .then((entity: T) => {
                    return this.crudService.create(entity);
                })
                .then((entity: T) => {
                    console.log('fim');
                    this.respond(response, entity);
                });
        });
    }

    handler(): Router {
        return this.router;
    }


    readData(request): Promise<T> {
        if (this.mock) {
            return this.readDataMock(request);
        }

        return new Promise<T>((resolve, reject) => {
            // temporary data holder
            const body = [];
            // on every content chunk, push it to the data array
            request.on('data', (chunk) => body.push(chunk));
            // we are done, resolve promise with those joined chunks
            request.on('end', () => resolve(JSON.parse(body.join(''))));
        });
    }

    respond(response, data): void {
        response.json(data);
        response.end();
    }

    private static counter = 0;

    readDataMock(request): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const i = BaseCrudController.counter++;
            const id = request.params.id;
            // temporary data holder
            const body = ['{', '"nome":"Fulano' + i + '"', ',"sobrenome":"da Silva' + i + '"', ',"email":"' + id + '"', ',"senha":"$#df%¨DS@#sd(*D@#df$#%GH!@' + i + '"', ',"status":"ok"', '}'];
            console.log('data: ' + body.join(''));
            // resolve(JSON.parse(body.join('')));

            //resolve(JSON.parse('{"name" : "auditoria na casa do ze", "period" : {"start" : "2017-07-25T00:00:00", "end" : "2017-07-25T00:10:00" },"chat" : [{"timestamp" : "2017-07-25T00:01:00", "user" : "vistoriador", "text" : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}], "approval" : {"user" : "supervisor", "timestamp" : "2017-07-26T00:00:00", "status" : "OK"}}'));
            resolve(JSON.parse('{"chatId": "5973aaa3d50805423c20d799", "timestamp" : "2017-07-25T00:01:00", "user" : "vistoriador", "text" : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}'));
        });
    }
}
