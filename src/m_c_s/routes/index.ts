import * as fs from 'fs';
import * as path from 'path';

export module routes {
    const routesFolder = './m_c_s/routes';
    export function init() {
        Object.defineProperty(exports, "__esModule", { value: true });
        fs.readdirSync(routesFolder).forEach(file => {
            if (fs.lstatSync(routesFolder + '/' + file).isDirectory()) {
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