import { db } from '../configs/firebase';
import { Component } from '../models/Component';
import { DatabaseError } from '../util/error/CustomError';

export class ComponentDao {

    async getAllComponents(authId : any) {   
        try {     
            const components : Array<Component> =  new Array<Component>();    
            const documents = await db.collection('users').doc(authId).collection('components').orderBy('name').get();
            documents.forEach(document => {
                const component : Component = new Component(document.id, document.data().name, document.data().selectOptions, document.data().selected, document.data().typeId, document.data().values);
                components.push(component);
            });
            return components;
        } catch (error) {
            throw new DatabaseError("Could not retrieve components from database");
        }
    }

    async getComponentById(authId : any, componentId : string) {    
        try {    
            const document = await db.collection('users').doc(authId).collection('components').doc(componentId).get();
            const documentData : any = document.data();
            const component : Component = new Component(document.id, documentData.name, documentData.selectOptions, documentData.selected, documentData.typeId, documentData.values);
            return component;
        } catch (error) {
            throw new DatabaseError("Could not retrieve component from database");
        }
    }

    async addComponents(authId : any, components : Array<Component>) {
        try {
            const existingComponents : Array<Component> = await this.getAllComponents(authId);
            const batch = db.batch();
            for (const component of components) {
                const matchingComponent = existingComponents.find(existingComponent => existingComponent.name === component.name);
                const document = matchingComponent ? 
                    db.collection('users').doc(authId).collection('components').doc(matchingComponent.id) :
                    db.collection('users').doc(authId).collection('components').doc();
                let {id, ...newComponent } = component;
                batch.set(document, newComponent);
            }
            await batch.commit();
            return;
        } catch (error) {
            throw new DatabaseError("Could not add component to database");
        }
    }

    async updateComponent(authId : any, componentId : string, componentData : Component) {
        try {
            await db.collection('users').doc(authId).collection('components').doc(componentId).update(componentData);
        } catch (error) {
            throw new DatabaseError("Could not retrieve update component in database");
        }
    }

}