import { db } from '../configs/firebase';
import { Component } from '../models/Component';
import { Option } from '../models/Option';
import { DatabaseError } from '../util/error/CustomError';
import Logger from '../util/logs/logger';
import { ComponentDao } from './ComponentDao';

export class ComponentDaoImpl {

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
            throw new DatabaseError("Could not retrieve components from database: " + error);
        }
    }

    async getComponentById(authId : any, componentId : string) {    
        try {    
            const document = await db.collection('users').doc(authId).collection('components').doc(componentId).get();
            const documentData : any = document.data();
            const component : Component = new Component(document.id, documentData.name, documentData.selectOptions, documentData.selected, documentData.typeId, documentData.values);
            return component;
        } catch (error) {
            throw new DatabaseError("Could not retrieve component from database: " + error);
        }
    }

    async addComponents(authId : any, components : Array<Component>) {
        try {
            const existingComponents : Array<Component> = await this.getAllComponents(authId);
            const batch = db.batch();
            for (const component of components) {
                const matchingComponent = existingComponents.find(existingComponent => existingComponent.id === component.id);
                const document = matchingComponent ? 
                    db.collection('users').doc(authId).collection('components').doc(matchingComponent.id) :
                    db.collection('users').doc(authId).collection('components').doc();
                const serializedComponent = component.toObject ? component.toObject() : component
                let {id, ...newComponent } = serializedComponent;
                batch.set(document, newComponent);
            }
            await batch.commit();
            return;
        } catch (error) {
            throw new DatabaseError("Could not add component to database: " + error);
        }
    }

    async updateComponent(authId: any, componentId: string, componentData: Component) {
        try {
            const dataToUpdate = componentData.toObject ? componentData.toObject() : componentData as unknown as { [key: string]: any };
            await db.collection('users').doc(authId).collection('components').doc(componentId).update(dataToUpdate);
        } catch (error) {
            throw new DatabaseError("Could not retrieve update component in database: " + error);
        }
    }
    

    async deleteComponents(authId : any, componentIds : Array<string>) {
        try {
            const batch = db.batch();
            for (const componentId of componentIds) {
                const document = db.collection('users').doc(authId).collection('components').doc(componentId);
                batch.delete(document);
            }
            await batch.commit();
        } catch (error) {
            throw new DatabaseError("Could not delete components from database: " + error);
        }
    }

    async addNewUserComponents(authId : any) {
        try {    
                Logger.info("Adding new user components for user: " + authId);
                const components : Array<Component> = [
                    new Component('', "Pain Level", [], true, 1, [5]),
                    new Component('', "Trouble Sleeping?", [
                      new Option("Not at all", "Not at all"),
                      new Option("Somewhat", "Somewhat"),
                      new Option("All night", "All night")
                    ], true, 2, []),
                    new Component('', "Symptoms",[
                      new Option("Headache", "Headache"),
                      new Option("Bloating", "Bloating"),
                      new Option("Heart Burn", "Heart Burn")
                    ], true, 3, [])
                ];
                await this.addComponents(authId, components);
                Logger.info("Successfully added components");
        } catch (error) {
            throw new DatabaseError("Could not add new user components: " + error);
        }
    }

}