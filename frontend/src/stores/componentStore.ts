import { Component } from '../models/Component';
import { defineStore } from 'pinia'
import { ComponentService } from '../services/ComponentService';
import { ErrorHandler } from '../util/error/ErrorHandler';

interface IComponentState {
  availableComponents : Array<Component>
  selectedComponents : Array<Component>
  newComponent : Component
}

export const useComponentStore = defineStore('componentStore', {
    state: () : IComponentState => ({
        availableComponents: [],
        selectedComponents: [],
        newComponent: new Component('', '', -1, false, [])
      }),
    actions: {
      async initializeComponentLists() {
        try {
          const componentService = new ComponentService();
          const allComponents : Array<Component> = await componentService.getAllComponents();
          this.availableComponents = allComponents.filter(component => !component.selected);
          this.selectedComponents = allComponents.filter(component => component.selected);
        } catch (error : any) {
          ErrorHandler.displayGenericError();
        }
      },
      async addComponents(components : Array<Component>) {
        try {
          const componentService = new ComponentService();
          await componentService.addComponents(components);
          await this.initializeComponentLists();
        } catch (error : any) {
          ErrorHandler.displayGenericError();
        }
      },
      async deleteComponents(componentsToDelete : Array<Component>) {
        try {
          const componentService = new ComponentService();
          const componentIds = componentsToDelete.map(componentToDelete => componentToDelete.id);
          await componentService.deleteComponents(componentsToDelete);
          this.availableComponents = await this.availableComponents.filter(component => !componentIds.includes(component.id));
        } catch (error : any) {
          ErrorHandler.displayGenericError();
        }
      },
      async toggleSelectedField(component : Component, selected : boolean) {
        try {
          const componentService = new ComponentService();
          component.selected = selected;
          await componentService.updateComponent(component);
          if (!selected) {
            const selectedIndex : number = this.selectedComponents.findIndex(selectedComponent => selectedComponent === component);
            this.selectedComponents.splice(selectedIndex, 1);
            this.availableComponents.push(component);
          } else {
            const selectedIndex : number = this.availableComponents.findIndex(availableComponent => availableComponent === component);
            this.availableComponents.splice(selectedIndex, 1);
            this.selectedComponents.push(component);
          }
        } catch (error : any) {
          ErrorHandler.displayGenericError();
        }        
      },
      clearNewComponentForm() {
        this.newComponent = new Component('', '', -1, false, []);
      }
    }
})