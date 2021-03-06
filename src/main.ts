import { Database } from "./m_c_s";
import { Server } from './m_c_s/server';
import * as fs from 'fs';
import { AppConfig } from './m_c_s';

export class Main {

    public static server: Server;
    private static appConf: any;
    private static db: Database;

    public static bootstrap(): void {
        Main.config();
        Main.startServer();
    }

    private static config() {
        const port = +process.argv[2]
        const dbURI = 'mongodb://' + process.argv[3]

        Main.appConf = { port: port, dbURI: dbURI };
        // Main.appConf = { port: 3002, dbURI: 'mongodb://iot_chat:iot_chat@ds151820.mlab.com:51820/iot_chat' };

        console.log("configuracao - " + Main.appConf);

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

console.log('>>>');
console.log(process.argv[2]);
console.log(process.argv[3]);
console.log('>>>');

console.log('waiting database startup...');
setTimeout(() => { Main.bootstrap(); }, 5000);

