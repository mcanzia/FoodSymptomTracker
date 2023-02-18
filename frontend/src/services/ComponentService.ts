import { ComponentController } from '../controllers/ComponentController';
import { Component } from '../models/Component';

export class ComponentService {

    private componentController : ComponentController;

    constructor() {
        this.componentController = new ComponentController();
    }

    async getAllComponents(userAuth : any) {
        const allComponents = JSON.parse(await this.componentController.getAllComponents(userAuth));
        return allComponents;
    }

    async getComponentById(userAuth : any, componentId : string) {
        const component = await this.componentController.getComponentById(userAuth, componentId);
        console.log(component);
        return component;
    }

    async addComponents(userAuth : any, components : Array<Component>) {
        const component = await this.componentController.addComponents(userAuth, components);
        return component;
    }

    async updateComponent(userAuth : any, component : Component) {
        await this.componentController.updateComponent(userAuth, component);
        return;
    }
}