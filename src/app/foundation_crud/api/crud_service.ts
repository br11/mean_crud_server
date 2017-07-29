/**
 * 
 */
export interface CrudService<T> {

    /**
     * 
     */
    create(entity: T): Promise<T>;

    /**
     * 
     */
    update(entity: T): Promise<T>;

    /**
     * 
     */
    delete(entity: T): Promise<T>;

    /**
     * 
     */
    retrieveById(id: any): Promise<T>;

    /**
     * 
     */
    retrieveAll(): Promise<T[]>;

    /**
     * 
     */
    retrieveByCriteria(criteria: object): Promise<T[]>;

}