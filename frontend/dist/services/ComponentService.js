import { ComponentController } from '../controllers/ComponentController';
import { useUserStore } from '../stores/userStore';
export class ComponentService {
    componentController;
    userStore;
    constructor() {
        this.componentController = new ComponentController();
        this.userStore = useUserStore();
    }
    async getAllComponents() {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const response = await this.componentController.getAllComponents(userAccessToken);
            const allComponents = response ? JSON.parse(response) : [];
            return allComponents;
        }
        catch (error) {
            throw error;
        }
    }
    async getComponentById(componentId) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const component = await this.componentController.getComponentById(userAccessToken, componentId);
            return component;
        }
        catch (error) {
            throw error;
        }
    }
    async addComponents(components) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const component = await this.componentController.addComponents(userAccessToken, components);
            return component;
        }
        catch (error) {
            throw error;
        }
    }
    async updateComponent(component) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            await this.componentController.updateComponent(userAccessToken, component);
            return;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteComponents(components) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const component = await this.componentController.deleteComponents(userAccessToken, components);
            return component;
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=ComponentService.js.map