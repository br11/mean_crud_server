import { Database } from '../..';

import { CrudDao } from '..';

export class BaseCrudDao<T> implements CrudDao<T> {

    constructor(private modelName: string) {
    
    }

    create(entity: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            console.log('vai criar');
            const model = Database.getModel(this.modelName);
            model.create(entity, (err, persistentEntity) => {
                console.log('criou ou nao');
                if (err) {
                    console.log(err);
                    throw err;
                }
                console.log('criou sim');
                resolve(persistentEntity);
            });
        });
    }

    update(entity: T): Promise<T> {
        return new Promise<T>(() => {
            // TODO
            return entity;
        });
    }

    delete(entity: T): Promise<T> {
        return new Promise<T>(() => {
            // TODO
            return entity;
        });
    }

    retrieveById(id: any): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const model = Database.getModel(this.modelName);
            model.findOne({ '_id': id })
                .exec((err, entity) => {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    resolve(entity);
                });
        });
    }

    retrieveAll(): Promise<T[]> {
         return new Promise<T[]>((resolve, reject) => {
            const model = Database.getModel(this.modelName);
            model.find({})
                .exec((err, entities) => {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    resolve(entities);
                });
        });
    }
    
    retrieveByCriteria(criteria: object): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            const model = Database.getModel(this.modelName);
            model.find(criteria)
                .exec((err, entities) => {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    resolve(entities);
                });
        });
    }

}