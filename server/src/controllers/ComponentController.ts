import { NextFunction, Request, Response } from 'express';
import { ComponentDao } from '../dao/ComponentDao';
import { Component } from '../models/Component';

export class ComponentController {

    public componentDao : ComponentDao;

    // potentially look into dependency injection container frameworks
    constructor() {
        this.componentDao = new ComponentDao;
    }

    async getAllComponents(request : Request, response : Response, next : NextFunction) {
        try {
            const componentDao : ComponentDao = new ComponentDao();
            const userAuth = response.locals.userAuth;
            const components : Array<Component> = await componentDao.getAllComponents(userAuth);
            response.status(200).json(JSON.stringify(components));
        } catch (error) {
            console.log(error);
            response.send(error);
        }
    }

    async getComponentById(request : Request, response : Response, next : NextFunction) {
        try {
            const componentDao : ComponentDao = new ComponentDao();
            const userAuth = response.locals.userAuth;
            const componentId : string = request.params.componentId;
            const component : Component = await componentDao.getComponentById(userAuth, componentId);
            response.status(200).json(JSON.stringify(component));
        } catch (error) {
            console.log(error);
            response.send(error);
        }
    }

    async addComponents(request : Request, response : Response, next : NextFunction) {
        try {
            const componentDao : ComponentDao = new ComponentDao();
            const userAuth = response.locals.userAuth;
            const components : Array<Component> = request.body;
            await componentDao.addComponents(userAuth, components);
            response.status(200).send('Success');
        } catch (error) {
            console.log(error);
            response.send(error);
        }
    }

    async updateComponent(request : Request, response : Response, next : NextFunction) {
        try {
            const componentDao : ComponentDao = new ComponentDao();
            const userAuth = response.locals.userAuth;
            const componentId : string = request.params.componentId;
            const componentData : Component = request.body;
            await componentDao.updateComponent(userAuth, componentId, componentData);
            response.status(200).send('Success');
        } catch (error) {
            console.log(error);
            response.send(error);
        }
    }

}
