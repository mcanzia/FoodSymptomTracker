import { Component } from '../models/Component';
import { defineStore } from 'pinia';
import { ComponentService } from '../services/ComponentService';
import { ErrorHandler } from '../util/error/ErrorHandler';
import { Option } from '../models/Option';
export const useComponentStore = defineStore('componentStore', {
    state: () => ({
        availableComponents: [],
        selectedComponents: [],
        newComponent: new Component('', '', -1, false, [])
    }),
    actions: {
        async initializeComponentLists() {
            try {
                const componentService = new ComponentService();
                const allComponents = await componentService.getAllComponents();
                this.availableComponents = allComponents.filter(component => !component.selected);
                this.selectedComponents = allComponents.filter(component => component.selected);
            }
            catch (error) {
                ErrorHandler.displayGenericError();
            }
        },
        async addNewUserComponents() {
            const newComponents = [
                new Component('', "Pain Level", 1, true, [], 5),
                new Component('', "Trouble Sleeping?", 2, true, [
                    new Option("Not at all", "Not at all"),
                    new Option("Somewhat", "Somewhat"),
                    new Option("All night", "All night")
                ], ""),
                new Component('', "Symptoms", 3, true, [
                    new Option("Headache", "Headache"),
                    new Option("Bloating", "Bloating"),
                    new Option("Heart Burn", "Heart Burn")
                ], [])
            ];
            await this.addComponents(newComponents);
        },
        async addComponents(components) {
            try {
                const componentService = new ComponentService();
                await componentService.addComponents(components);
                await this.initializeComponentLists();
            }
            catch (error) {
                ErrorHandler.displayGenericError();
            }
        },
        async deleteComponents(componentsToDelete) {
            try {
                const componentService = new ComponentService();
                const componentIds = componentsToDelete.map(componentToDelete => componentToDelete.id);
                await componentService.deleteComponents(componentsToDelete);
                this.availableComponents = await this.availableComponents.filter(component => !componentIds.includes(component.id));
            }
            catch (error) {
                ErrorHandler.displayGenericError();
            }
        },
        async toggleSelectedField(component, selected) {
            try {
                const componentService = new ComponentService();
                component.selected = selected;
                await componentService.updateComponent(component);
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