import { CrudService, CrudDao, BaseCrudDao } from '..';

export class BaseCrudService<T> implements CrudService<T> {

    private dao: CrudDao<T>;

    constructor(modelName: string) {
        this.dao = new BaseCrudDao(modelName);
    }

    create(entity: T): Promise<T> {
        return this.dao.create(entity)
            .then((persistentEntity: T) => {
                return persistentEntity;
            });
    }

    update(entity: T): Promise<T> {
        return this.dao.update(entity)
            .then((persistentEntity: T) => {
                return persistentEntity;
            });
    }

    delete(entity: T): Promise<T> {
        return this.dao.delete(entity)
            .then((persistentEntity: T) => {
                return persistentEntity;
            });
    }

    retrieveById(id: any): Promise<T> {
        return this.dao.retrieveById(id)
            .then((persistentEntity: T) => {
                return persistentEntity;
            });
    }

    retrieveAll(): Promise<T[]> {
        return this.dao.retrieveAll()
            .then((persistentEntities: T[]) => {
                return persistentEntities;
            });
    }

    retrieveByCriteria(criteria: object): Promise<T[]> {
        return this.dao.retrieveByCriteria(criteria)
            .then((persistentEntities: T[]) => {
                return persistentEntities;
            });
    }
}