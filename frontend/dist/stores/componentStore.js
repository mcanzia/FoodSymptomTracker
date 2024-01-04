import { Component } from '../models/Component';
import { defineStore } from 'pinia';
import { ComponentService } from '../services/ComponentService';
import { ErrorHandler } from '../util/error/ErrorHandler';
export const useComponentStore = defineStore('componentStore', {
    state: () => ({
        availableComponents: [],
        selectedComponents: [],
        newComponent: new Component('', '', -1, false, [])
    }),
    actions: {
        async initializeComponentLists(userToken) {
            try {
                const componentService = new ComponentService();
                const allComponents = await componentService.getAllComponents(userToken);
                this.availableComponents = allComponents.filter(component => !component.selected);
                this.selectedComponents = allComponents.filter(component => component.selected);
            }
            catch (error) {
                ErrorHandler.displayGenericError();
            }
        },
        async addComponents(userToken, components) {
            try {
                const componentService = new ComponentService();
                await componentService.addComponents(userToken, components);
                await this.initializeComponentLists(userToken);
            }
            catch (error) {
                ErrorHandler.displayGenericError();
            }
        },
        async deleteComponents(userToken, componentsToDelete) {
            try {
                const componentService = new ComponentService();
                const componentIds = componentsToDelete.map(componentToDelete => componentToDelete.id);
                await componentService.deleteComponents(userToken, componentsToDelete);
                this.availableComponents = await this.availableComponents.filter(component => !componentIds.includes(component.id));
            }
            catch (error) {
                ErrorHandler.displayGenericError();
            }
        },
        async toggleSelectedField(userToken, component, selected) {
            try {
                const componentService = new ComponentService();
                component.selected = selected;
                await componentService.updateComponent(userToken, component);
                if (!selected) {
                    const selectedIndex = this.selectedComponents.findIndex(selectedComponent => selectedComponent === component);
                    this.selectedComponents.splice(selectedIndex, 1);
                    this.availableComponents.push(component);
                }
                else {
                    const selectedIndex = this.availableComponents.findIndex(availableComponent => availableComponent === component);
                    this.availableComponents.splice(selectedIndex, 1);
                    this.selectedComponents.push(component);
                }
            }
            catch (error) {
                ErrorHandler.displayGenericError();
            }
        },
        clearNewComponentForm() {
            this.newComponent = new Component('', '', -1, false, []);
        }
    }
});
//# sourceMappingURL=componentStore.js.map