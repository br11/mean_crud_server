import { Mongoose } from 'mongoose';
import { SchemaDefRegister } from '..';

/**
 * 
 */
export class Database {

    static defaultDb: Database = null;

    private mongoose: Mongoose;

    static getModel(modelName: string): any {
        return Database.defaultDb.getModel(modelName);
    }

    /**
     * 
     * @param conf { dbURI: string }
     */
    constructor(private conf: { dbURI: string, name?: string }) {
        this.mongoose = new Mongoose();
        if (!(conf.name)) {
            if (Database.defaultDb == null) {
                Database.defaultDb = this;
            } else {
                throw new Error('Database name is missing in the configuration. Only the main database is unnamed.');
            }
        }
    }

    /**
     * When successfully connected
     * @param callback 
     */
    onConnected(callback: () => any): Database {
        console.log('conn state: ' + this.mongoose.connection.readyState);
        this.mongoose.connection.on('connected', callback);
        return this;
    }

    /**
     * If the connection throws an error
     * @param callback 
     */
    onError(callback: (err: any) => any): Database {
        this.mongoose.connection.on('error', callback);
        return this;
    }

    /**
     * When the connection is disconnected
     * @param callback 
     */
    public onDisconnected(callback: () => any): Database {
        this.mongoose.connection.on('disconnected', callback);
        return this;
    }

    /**
     * Create the database connection 
     */
    public connect(): Database {
         // this.mongoose.connect(this.conf.dbURI, { useMongoClient: true });
         this.mongoose.connect(this.conf.dbURI, { user: 'mean_crud_server', pass: '123456', useMongoClient: true });
        return this;
    }

    /**
     * Close the database connection
     */
    public disconnect(callback: (err: any) => any): Database {
        this.mongoose.connection.close(callback);
        return this;
    }

    private getModel<T>(modelName: string): any {
        console.log('getModel: connetion state:' + this.mongoose.connection.readyState);

        let schemaDef = SchemaDefRegister.getDef(modelName);

        try {
            return this.createModel(modelName, schemaDef);
        } catch (err) {
            return this.mongoose.model(modelName);
        }

    }

    /**
     * 
     * @param modelName 
     * @param def 
     */
    private createModel<T>(modelName: string, def: Object): any {
        console.log('createModel: connetion state:' + this.mongoose.connection.readyState);

        const entitySchema = this.mongoose.Schema(def);
        const entityModel = this.mongoose.model(modelName, entitySchema);

        console.log('createModel: model "' + modelName + '" created');
        return entityModel;
    }

}