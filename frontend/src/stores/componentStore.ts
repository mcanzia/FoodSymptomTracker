import { Component } from '../models/Component';
import { defineStore } from 'pinia'
import { ComponentService } from '../services/ComponentService';

interface IComponentState {
  availableComponents : Array<Component>
  selectedComponents : Array<Component>
}

export const useComponentStore = defineStore('componentStore', {
    state: () : IComponentState => ({
        availableComponents: [],
        selectedComponents: []
      }),
    actions: {
      async initializeComponentLists(userToken : any) {
        const componentService = new ComponentService();
        const allComponents : Array<Component> = await componentService.getAllComponents(userToken);
        this.availableComponents = allComponents.filter(component => !component.selected);
        this.selectedComponents = allComponents.filter(component => component.selected);
      },
      async addComponents(userToken : any, components : Array<Component>) {
        const componentService = new ComponentService();
        await componentService.addComponents(userToken, components);
        await this.initializeComponentLists(userToken);
      },
      async toggleSelectedField(userToken : any, component : Component, selected : boolean) {
        const componentService = new ComponentService();
        component.selected = selected;
        if (!selected) {
          const selectedIndex : number = this.selectedComponents.findIndex(selectedComponent => selectedComponent === component);
          this.selectedComponents.splice(selectedIndex, 1);
          this.availableComponents.push(component);
        } else {
          const selectedIndex : number = this.availableComponents.findIndex(availableComponent => availableComponent === component);
          this.availableComponents.splice(selectedIndex, 1);
          this.selectedComponents.push(component);
        }
        await componentService.updateComponent(userToken, component);
      }
    }
})