import { ComponentController } from '../controllers/ComponentController';

export class ComponentService {
    constructor() {
        this.componentController = new ComponentController();
    }

    async getAllComponents(userAuth) {
        const allComponents = await this.componentController.getAllComponents(userAuth);
        console.log(allComponents);
        return allComponents;
    }

    async getComponentById(userAuth, componentId) {
        const component = await this.componentController.getComponentById(userAuth, componentId);
        console.log(component);
        return component;
    }

    async addComponents(userAuth, components) {
        await this.componentController.addComponents(userAuth, components);
    }

    async updateComponent(userAuth, component) {
        const { id, ...componentUpdate } = component;
        await this.componentController.updateComponent(userAuth, id, componentUpdate);
    }
}