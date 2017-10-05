import { Router } from 'express';

/**
 * 
 */
export interface CrudController<T> {

    handler(): Router;

}