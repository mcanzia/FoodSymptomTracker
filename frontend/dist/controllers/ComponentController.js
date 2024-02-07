import { ErrorHandler } from "../util/error/ErrorHandler";
import { ObjectType } from "../models/ObjectType";
import { RequestUtil } from "./RequestUtil";
export class ComponentController {
    async getAllComponents(userAuthToken) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/components`;
            const response = await fetch(requestUrl, RequestUtil.GETRequestParams(userAuthToken));
            return response.json();
        }
        catch (error) {
            ErrorHandler.handleGetAllError(userAuthToken, ObjectType.COMPONENT, error);
        }
    }
    async getComponentById(userAuthToken, componentId) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/components/${componentId}`;
            const response = await fetch(requestUrl, RequestUtil.GETRequestParams(userAuthToken));
            return response.json();
        }
        catch (error) {
            ErrorHandler.handleGetByIdError(userAuthToken, ObjectType.COMPONENT, componentId, error);
        }
    }
    async addComponents(userAuthToken, components) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/components`;
            const response = await fetch(requestUrl, RequestUtil.POSTRequestParams(userAuthToken, components));
            return response;
        }
        catch (error) {
            ErrorHandler.handleAddError(userAuthToken, ObjectType.COMPONENT, components, error);
        }
    }
    async updateComponent(userAuthToken, component) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/components/${component.id}`;
            const response = await fetch(requestUrl, RequestUtil.PUTRequestParams(userAuthToken, component));
            return response;
        }
        catch (error) {
            ErrorHandler.handleUpdateError(userAuthToken, ObjectType.COMPONENT, component, error);
        }
    }
    async deleteComponents(userAuthToken, components) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/components`;
            const response = await fetch(requestUrl, RequestUtil.DELETERequestParams(userAuthToken, components));
            return response;
        }
        catch (error) {
            ErrorHandler.handleDeleteError(userAuthToken, ObjectType.COMPONENT, components, error);
        }
    }
    async addNewUserComponents(userAuthToken) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/components/newUser`;
            const response = await fetch(requestUrl, RequestUtil.POSTRequestParams(userAuthToken, []));
            return response;
        }
        catch (error) {
            ErrorHandler.handleAddError(userAuthToken, ObjectType.COMPONENT, [], error);
        }
    }
}
//# sourceMappingURL=ComponentController.js.map