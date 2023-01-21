import { defineStore } from 'pinia'
import { ComponentService } from '../services/ComponentService';

export const useComponentStore = defineStore('componentStore', {
    state: () => ({
        availableComponents: [],
        selectedComponents: []
      }),
    actions: {
      async initializeComponentLists(userToken) {
        const componentService = new ComponentService();
        const allComponents = await componentService.getAllComponents(userToken);
        this.availableComponents = allComponents.filter(component => !component.selected);
        this.selectedComponents = allComponents.filter(component => component.selected);
      },
      async addComponents(userToken, components) {
        const componentService = new ComponentService();
        await componentService.addComponents(userToken, components);
        await this.initializeComponentLists(userToken);
      },
      async toggleSelectedField(userToken, component, selected) {
        const componentService = new ComponentService();
        component.selected = selected;
        if (!selected) {
          const selectedIndex = this.selectedComponents.findIndex(selectedComponent => selectedComponent === component);
          this.selectedComponents.splice(selectedIndex, 1);
          this.availableComponents.push(component);
        } else {
          const selectedIndex = this.availableComponents.findIndex(availableComponent => availableComponent === component);
          this.availableComponents.splice(selectedIndex, 1);
          this.selectedComponents.push(component);
        }
        await componentService.updateComponent(userToken, component);
      }
    }
})