import * as express from 'express';
import { Application, Router, Request, Response } from 'express';

import * as routes from "../routes";

import { BaseCrudController, RoutesRegister } from "..";

export class Server {

    private app: express.Application;
    private router: Router = Router();

    constructor(private config: { port: number }) {
        this.init();
        this.routes();
    }

    public init() {
        this.app = express();
        this.app.listen(this.config.port, () => {
            console.log(`Listening at http://localhost:` + this.config.port);
        });
    }

    public routes() {

        routes.routes.init();

        RoutesRegister.registry.forEach(element => {
            console.log('creating route ' + element.path + ' to ' + element.modelName);
            new BaseCrudController(this.router, element.modelName, element.path);
        });

        this.app.use("/api", this.router);
    }
}