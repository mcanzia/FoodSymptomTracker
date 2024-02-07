import { ComponentController } from '../controllers/ComponentController';
import { useUserStore } from '../stores/userStore';
import { Component } from '../models/Component';

export class ComponentService {

    private componentController : ComponentController;
    private userStore : any;

    constructor() {
        this.componentController = new ComponentController();
        this.userStore = useUserStore();
    }

    async getAllComponents() {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const response =  await this.componentController.getAllComponents(userAccessToken);
            const allComponents = response ? JSON.parse(response) : [];
            return allComponents;
        } catch (error) {
            throw error;
        }
    }

    async getComponentById(componentId : string) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const component = await this.componentController.getComponentById(userAccessToken, componentId);
            return component;
        } catch (error) {
            throw error;
        } 
    }

    async addComponents(components : Array<Component>) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const component = await this.componentController.addComponents(userAccessToken, components);
            return component;
        } catch (error) {
            throw error;
        }
    }

    async updateComponent(component : Component) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            await this.componentController.updateComponent(userAccessToken, component);
            return;
        } catch (error) {
            throw error;
        }
    }

    async deleteComponents(components : Array<Component>) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const component = await this.componentController.deleteComponents(userAccessToken, components);
            return component;
        } catch (error) {
            throw error;
        }
    }

    async addNewUserComponents() {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const component = await this.componentController.addNewUserComponents(userAccessToken);
            return component;
        } catch (error) {
            throw error;
        }
    }
}