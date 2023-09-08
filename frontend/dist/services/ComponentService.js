import { ComponentController } from '../controllers/ComponentController';
export class ComponentService {
    constructor() {
        this.componentController = new ComponentController();
    }
    async getAllComponents(userAuth) {
        const allComponents = JSON.parse(await this.componentController.getAllComponents(userAuth));
        return allComponents;
    }
    async getComponentById(userAuth, componentId) {
        const component = await this.componentController.getComponentById(userAuth, componentId);
        console.log(component);
        return component;
    }
    async addComponents(userAuth, components) {
        const component = await this.componentController.addComponents(userAuth, components);
        return component;
    }
    async updateComponent(userAuth, component) {
        await this.componentController.updateComponent(userAuth, component);
        return;
    }
    async deleteComponents(userAuth, components) {
        const component = await this.componentController.deleteComponents(userAuth, components);
        return component;
    }
}
//# sourceMappingURL=ComponentService.js.map