import { db } from '../configs/firebase';
import { Component } from '../models/Component';

export class ComponentDao {

    async getAllComponents(authId : any) {   
        try {     
            const components : Array<Component> =  new Array<Component>();    
            const documents = await db.collection('users').doc(authId).collection('components').get();
            documents.forEach(document => {
                console.log(document.data());
                const component : Component = new Component(document.id, document.data().name, document.data().order, document.data().selectOptions, document.data().selected, document.data().typeId);
                components.push(component);
            });
            return components;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getComponentById(authId : any, componentId : string) {    
        try {    
            const document = await db.collection('users').doc(authId).collection('components').doc(componentId).get();
            const documentData : any = document.data();
            const component : Component = new Component(document.id, documentData.name, documentData.order, documentData.selectOptions, documentData.selected, documentData.typeId);
            return component;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async addComponents(authId : any, components : Array<Component>) {
        try {
            const existingComponents : Array<Component> = await this.getAllComponents(authId);
            const batch = db.batch();
            for (const component of components) {
                if (!component.id) {
                    const matchingComponent = existingComponents.find(existingComponent => existingComponent.name === component.name);
                    if (matchingComponent) {
                        console.log('already exists');
                        continue;
                    }
                    const document = db.collection('users').doc(authId).collection('components').doc();
                    let {id, ...newComponent } = component;
                    console.log('new component');
                    batch.set(document, newComponent);
                }
            }
            await batch.commit();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateComponent(authId : any, componentId : string, componentData : Component) {
        try {
            await db.collection('users').doc(authId).collection('components').doc(componentId).update(componentData);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}