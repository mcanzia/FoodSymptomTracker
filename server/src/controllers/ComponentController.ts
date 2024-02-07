import { NextFunction, Request, Response } from 'express';
import { ComponentDao } from '../dao/ComponentDao';

export interface ComponentController {

    componentDao : ComponentDao;

    getAllComponents(request : Request, response : Response, next : NextFunction) : void;
    getComponentById(request : Request, response : Response, next : NextFunction) : void;
    addComponents(request : Request, response : Response, next : NextFunction) : void;
    updateComponent(request : Request, response : Response, next : NextFunction) : void;
    deleteComponents(request : Request, response : Response, next : NextFunction) : void;
    addNewUserComponents(request : Request, response : Response, next : NextFunction) : void;

}
