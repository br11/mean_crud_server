import * as fs from 'fs';
import * as path from 'path';

export module routes {
    const testFolder = './src/app/routes';
    export function init() {
        Object.defineProperty(exports, "__esModule", { value: true });
        fs.readdirSync(testFolder).forEach(file => {
            if (fs.lstatSync('./src/app/routes/' + file).isDirectory()) {
                console.log(file);
                let module = require('./' + file);

                for (var property in module) {
                    if (!exports.hasOwnProperty(property)) {
                        exports[property] = module[property];
                    }
                }
            }
        });
    }
}