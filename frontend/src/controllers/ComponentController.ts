import { ErrorHandler } from "../util/error/ErrorHandler";
import { Component } from "../models/Component";
import { ObjectType } from "../models/ObjectType";
import { RequestUtil } from "./RequestUtil";

export class ComponentController {
    async getAllComponents(userAuthToken: any) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/components`;
            const response = await fetch(requestUrl, RequestUtil.GETRequestParams(userAuthToken));
            return response.json();
        } catch (error: any) {
            ErrorHandler.handleGetAllError<Component>(userAuthToken, ObjectType.COMPONENT, error);
        }
    }

    async getComponentById(userAuthToken: any, componentId: string) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/components/${componentId}`;
            const response = await fetch(requestUrl, RequestUtil.GETRequestParams(userAuthToken));
            return response.json();
        } catch (error: any) {
            ErrorHandler.handleGetByIdError<Component>(userAuthToken, ObjectType.COMPONENT, componentId, error);
        }
    }

    async addComponents(userAuthToken: any, components: Array<Component>) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/components`;
            const response = await fetch(requestUrl, RequestUtil.POSTRequestParams(userAuthToken, components));
            return response;
        } catch (error: any) {
            ErrorHandler.handleAddError<Component>(userAuthToken, ObjectType.COMPONENT, components, error);
        }
    }

    async updateComponent(userAuthToken: any, component: Component) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/components/${component.id}`;
            const response = await fetch(requestUrl, RequestUtil.PUTRequestParams(userAuthToken, component));
            return response;
        } catch (error: any) {
            ErrorHandler.handleUpdateError<Component>(userAuthToken, ObjectType.COMPONENT, component, error);
        }
    }

    async deleteComponents(userAuthToken: any, components: Array<Component>) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/components`;
            const response = await fetch(requestUrl, RequestUtil.DELETERequestParams(userAuthToken, components));
            return response;
        } catch (error: any) {
            ErrorHandler.handleDeleteError<Component>(userAuthToken, ObjectType.COMPONENT, components, error);
        }
    }
}
