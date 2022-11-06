"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentController = void 0;
const ComponentDao_1 = require("../dao/ComponentDao");
class ComponentController {
    // potentially look into dependency injection container frameworks
    constructor() {
        this.componentDao = new ComponentDao_1.ComponentDao;
    }
    async getAllComponents(request, response, next) {
        try {
            const componentDao = new ComponentDao_1.ComponentDao();
            const userAuth = request.headers['user-auth'];
            const components = await componentDao.getAllComponents(userAuth);
            response.status(200).json(JSON.stringify(components));
        }
        catch (error) {
            console.log(error);
            response.send(error);
        }
    }
    async getComponentById(request, response, next) {
        try {
            const componentDao = new ComponentDao_1.ComponentDao();
            const userAuth = request.headers['user-auth'];
            const componentId = request.params.componentId;
            const component = await componentDao.getComponentById(userAuth, componentId);
            response.status(200).json(JSON.stringify(component));
        }
        catch (error) {
            console.log(error);
            response.send(error);
        }
    }
    async addComponents(request, response, next) {
        try {
            const componentDao = new ComponentDao_1.ComponentDao();
            const userAuth = request.headers['user-auth'];
            const components = request.body;
            await componentDao.addComponents(userAuth, components);
            response.status(200);
        }
        catch (error) {
            console.log(error);
            response.send(error);
        }
    }
    async updateComponent(request, response, next) {
        try {
            const componentDao = new ComponentDao_1.ComponentDao();
            const userAuth = request.headers['user-auth'];
            const componentId = request.params.componentId;
            const componentData = request.body;
            await componentDao.updateComponent(userAuth, componentId, componentData);
        }
        catch (error) {
            console.log(error);
            response.send(error);
        }
    }
}
exports.ComponentController = ComponentController;
