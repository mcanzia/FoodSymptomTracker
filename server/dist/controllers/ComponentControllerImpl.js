"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentControllerImpl = void 0;
const logger_1 = __importDefault(require("../util/logs/logger"));
const ComponentDaoImpl_1 = require("../dao/ComponentDaoImpl");
class ComponentControllerImpl {
    componentDao;
    // potentially look into dependency injection container frameworks
    constructor() {
        this.componentDao = new ComponentDaoImpl_1.ComponentDaoImpl;
    }
    async getAllComponents(request, response, next) {
        try {
            logger_1.default.info("Retrieving components for user: " + response.locals.userAuth);
            const componentDao = new ComponentDaoImpl_1.ComponentDaoImpl();
            const userAuth = response.locals.userAuth;
            const components = await componentDao.getAllComponents(userAuth);
            logger_1.default.info("Number of components retrieved successfully: " + components.length);
            response.status(200).json(JSON.stringify(components));
        }
        catch (error) {
            logger_1.default.error("Error retrieving components for user " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
    async getComponentById(request, response, next) {
        try {
            logger_1.default.info("Retrieving component for user: " + response.locals.userAuth);
            const componentDao = new ComponentDaoImpl_1.ComponentDaoImpl();
            const userAuth = response.locals.userAuth;
            const componentId = request.params.componentId;
            const component = await componentDao.getComponentById(userAuth, componentId);
            logger_1.default.info("Component retrieved successfully: " + JSON.stringify(component));
            response.status(200).json(JSON.stringify(component));
        }
        catch (error) {
            logger_1.default.error("Error retrieving component for user " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
    async addComponents(request, response, next) {
        try {
            logger_1.default.info("Adding components for user: " + response.locals.userAuth);
            logger_1.default.info("Components: " + JSON.stringify(request.body));
            const componentDao = new ComponentDaoImpl_1.ComponentDaoImpl();
            const userAuth = response.locals.userAuth;
            const components = request.body;
            await componentDao.addComponents(userAuth, components);
            logger_1.default.info("Successfully added components");
            response.status(200).send('Success');
        }
        catch (error) {
            logger_1.default.error("Error adding charts for user " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
    async updateComponent(request, response, next) {
        try {
            logger_1.default.info("Updating components for user: " + response.locals.userAuth);
            logger_1.default.info("Components: " + JSON.stringify(request.body));
            const componentDao = new ComponentDaoImpl_1.ComponentDaoImpl();
            const userAuth = response.locals.userAuth;
            const componentId = request.params.componentId;
            const componentData = request.body;
            await componentDao.updateComponent(userAuth, componentId, componentData);
            logger_1.default.info("Successfully updated components");
            response.status(200).send('Success');
        }
        catch (error) {
            logger_1.default.error("Error updating components for user " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
    async deleteComponents(request, response, next) {
        try {
            logger_1.default.info("Deleting components for user: " + response.locals.userAuth);
            logger_1.default.info("Components: " + JSON.stringify(request.body));
            const componentDao = new ComponentDaoImpl_1.ComponentDaoImpl();
            const userAuth = response.locals.userAuth;
            const components = request.body;
            const componentIds = components.map(component => component.id);
            await componentDao.deleteComponents(userAuth, componentIds);
            logger_1.default.info("Successfully deleted components");
            response.status(200).send("Success");
        }
        catch (error) {
            logger_1.default.error("Error deleting components for user " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
    async addNewUserComponents(request, response, next) {
        try {
            const componentDao = new ComponentDaoImpl_1.ComponentDaoImpl();
            const userAuth = response.locals.userAuth;
            await componentDao.addNewUserComponents(userAuth);
            response.status(200).send('Success');
        }
        catch (error) {
            logger_1.default.error("Error adding charts for user " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
}
exports.ComponentControllerImpl = ComponentControllerImpl;
