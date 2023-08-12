import { NextFunction, Request, Response } from 'express';
import { ComponentDao } from '../dao/ComponentDao';
import { Component } from '../models/Component';
import Logger from '../util/logs/logger';

export class ComponentController {

    public componentDao : ComponentDao;

    // potentially look into dependency injection container frameworks
    constructor() {
        this.componentDao = new ComponentDao;
    }

    async getAllComponents(request : Request, response : Response, next : NextFunction) {
        try {
            Logger.info("Retrieving components for user: " + response.locals.userAuth);
            const componentDao : ComponentDao = new ComponentDao();
            const userAuth = response.locals.userAuth;
            const components : Array<Component> = await componentDao.getAllComponents(userAuth);
            Logger.info("Number of components retrieved successfully: " + components.length);
            response.status(200).json(JSON.stringify(components));
        } catch (error) {
            Logger.error("Error retrieving components for user " + 
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }

    async getComponentById(request : Request, response : Response, next : NextFunction) {
        try {
            Logger.info("Retrieving component for user: " + response.locals.userAuth);
            const componentDao : ComponentDao = new ComponentDao();
            const userAuth = response.locals.userAuth;
            const componentId : string = request.params.componentId;
            const component : Component = await componentDao.getComponentById(userAuth, componentId);
            Logger.info("Component retrieved successfully: " + JSON.stringify(component));
            response.status(200).json(JSON.stringify(component));
        } catch (error) {
            Logger.error("Error retrieving component for user " + 
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }

    async addComponents(request : Request, response : Response, next : NextFunction) {
        try {
            Logger.info("Adding components for user: " + response.locals.userAuth);
            Logger.info("Components: " + JSON.stringify(request.body));
            const componentDao : ComponentDao = new ComponentDao();
            const userAuth = response.locals.userAuth;
            const components : Array<Component> = request.body;
            await componentDao.addComponents(userAuth, components);
            Logger.info("Successfully added components");
            response.status(200).send('Success');
        } catch (error) {
            Logger.error("Error adding charts for user " + 
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }

    async updateComponent(request : Request, response : Response, next : NextFunction) {
        try {
            Logger.info("Updating components for user: " + response.locals.userAuth);
            Logger.info("Components: " + JSON.stringify(request.body));
            const componentDao : ComponentDao = new ComponentDao();
            const userAuth = response.locals.userAuth;
            const componentId : string = request.params.componentId;
            const componentData : Component = request.body;
            await componentDao.updateComponent(userAuth, componentId, componentData);
            Logger.info("Successfully updated components");
            response.status(200).send('Success');
        } catch (error) {
            Logger.error("Error updating components for user " + 
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }

}
