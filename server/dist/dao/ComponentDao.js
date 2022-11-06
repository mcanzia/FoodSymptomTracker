"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentDao = void 0;
const firebase_1 = require("../configs/firebase");
const Component_1 = require("../models/Component");
class ComponentDao {
    async getAllComponents(authId) {
        try {
            const components = new Array();
            const documents = await firebase_1.db.collection('users').doc(authId).collection('components').get();
            documents.forEach(document => {
                console.log(document.data());
                const component = new Component_1.Component(document.id, document.data().name, document.data().order, document.data().selectOptions, document.data().selected, document.data().typeId);
                components.push(component);
            });
            return components;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getComponentById(authId, componentId) {
        try {
            const document = await firebase_1.db.collection('users').doc(authId).collection('components').doc(componentId).get();
            const documentData = document.data();
            const component = new Component_1.Component(document.id, documentData.name, documentData.order, documentData.selectOptions, documentData.selected, documentData.typeId);
            return component;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async addComponents(authId, components) {
        try {
            const existingComponents = await this.getAllComponents(authId);
            const batch = firebase_1.db.batch();
            for (const component of components) {
                if (!component.id) {
                    const matchingComponent = existingComponents.find(existingComponent => existingComponent.name === component.name);
                    if (matchingComponent) {
                        console.log('already exists');
                        continue;
                    }
                    const document = firebase_1.db.collection('users').doc(authId).collection('components').doc();
                    let { id, ...newComponent } = component;
                    console.log('new component');
                    batch.set(document, newComponent);
                }
            }
            await batch.commit();
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async updateComponent(authId, componentId, componentData) {
        try {
            await firebase_1.db.collection('users').doc(authId).collection('components').doc(componentId).update(componentData);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}
exports.ComponentDao = ComponentDao;
