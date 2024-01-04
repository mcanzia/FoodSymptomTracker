import { Component } from '../models/Component';
import { defineStore } from 'pinia'
import { ComponentService } from '../services/ComponentService';
import { ErrorHandler } from '../util/error/ErrorHandler';
import { ObjectType } from '../models/ObjectType';

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
      async initializeComponentLists(userToken : any) {
        try {
          const componentService = new ComponentService();
          const allComponents : Array<Component> = await componentService.getAllComponents(userToken);
          this.availableComponents = allComponents.filter(component => !component.selected);
          this.selectedComponents = allComponents.filter(component => component.selected);
        } catch (error : any) {
          ErrorHandler.displayGenericError();
        }
      },
      async addComponents(userToken : any, components : Array<Component>) {
        try {
          const componentService = new ComponentService();
          await componentService.addComponents(userToken, components);
          await this.initializeComponentLists(userToken);
        } catch (error : any) {
          ErrorHandler.displayGenericError();
        }
      },
      async deleteComponents(userToken : any, componentsToDelete : Array<Component>) {
        try {
          const componentService = new ComponentService();
          const componentIds = componentsToDelete.map(componentToDelete => componentToDelete.id);
          await componentService.deleteComponents(userToken, componentsToDelete);
          this.availableComponents = await this.availableComponents.filter(component => !componentIds.includes(component.id));
        } catch (error : any) {
          ErrorHandler.displayGenericError();
        }
      },
      async toggleSelectedField(userToken : any, component : Component, selected : boolean) {
        try {
          const componentService = new ComponentService();
          component.selected = selected;
          await componentService.updateComponent(userToken, component);
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