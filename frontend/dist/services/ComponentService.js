import { ComponentController } from '../controllers/ComponentController';
export class ComponentService {
    componentController;
    constructor() {
        this.componentController = new ComponentController();
    }
    async getAllComponents(userAuth) {
        try {
            const response = await this.componentController.getAllComponents(userAuth);
            const allComponents = response ? JSON.parse(response) : [];
            return allComponents;
        }
        catch (error) {
            throw error;
        }
    }
    async getComponentById(userAuth, componentId) {
        try {
            const component = await this.componentController.getComponentById(userAuth, componentId);
            return component;
        }
        catch (error) {
            throw error;
        }
    }
    async addComponents(userAuth, components) {
        try {
            const component = await this.componentController.addComponents(userAuth, components);
            return component;
        }
        catch (error) {
            throw error;
        }
    }
    async updateComponent(userAuth, component) {
        try {
            await this.componentController.updateComponent(userAuth, component);
            return;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteComponents(userAuth, components) {
        try {
            const component = await this.componentController.deleteComponents(userAuth, components);
            return component;
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=ComponentService.js.map