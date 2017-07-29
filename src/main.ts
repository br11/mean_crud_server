import { Database } from "./app";
import { Server } from './app/server';
import * as fs from 'fs';
import { AppConfig } from './app';

export class Main {

    public static server: Server;
    private static appConf: any;
    private static db: Database;

    public static bootstrap(): void {
        Main.config();
        Main.startServer();
    }


    private static config() {
        // fs.readFileSync('./conf/app_conf.json');
         Main.appConf = { port: 3002, dbURI: 'mongodb://localhost:27017' };
        // Main.appConf = { port: 3002, dbURI: 'mongodb://iot_chat:iot_chat@ds151820.mlab.com:51820/iot_chat' };
       
        this.db = new Database(Main.appConf)
            .onConnected(() => {
                console.log('database connected');
            })
            .onDisconnected(() => {
                console.log('database disconnected');
            })
            .onError((err) => {
                console.log('database error: ' + err);
            })
            .connect();
    }

    private static startServer() {
        Main.server = new Server(Main.appConf);
    }
}

Main.bootstrap();
