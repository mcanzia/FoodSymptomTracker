import { ComponentController } from '../controllers/ComponentController';
import { Component } from '../models/Component';

export class ComponentService {

    private componentController : ComponentController;

    constructor() {
        this.componentController = new ComponentController();
    }

    async getAllComponents(userAuth : any) {
        try {
            const response =  await this.componentController.getAllComponents(userAuth);
            const allComponents = response ? JSON.parse(response) : [];
            return allComponents;
        } catch (error) {
            throw error;
        }
    }

    async getComponentById(userAuth : any, componentId : string) {
        try {
            const component = await this.componentController.getComponentById(userAuth, componentId);
            return component;
        } catch (error) {
            throw error;
        } 
    }

    async addComponents(userAuth : any, components : Array<Component>) {
        try {
            const component = await this.componentController.addComponents(userAuth, components);
            return component;
        } catch (error) {
            throw error;
        }
    }

    async updateComponent(userAuth : any, component : Component) {
        try {
            await this.componentController.updateComponent(userAuth, component);
            return;
        } catch (error) {
            throw error;
        }
    }

    async deleteComponents(userAuth : any, components : Array<Component>) {
        try {
            const component = await this.componentController.deleteComponents(userAuth, components);
            return component;
        } catch (error) {
            throw error;
        }
    }
}