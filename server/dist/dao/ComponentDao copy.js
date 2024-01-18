"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentDao = void 0;
const firebase_1 = require("../configs/firebase");
const Component_1 = require("../models/Component");
const CustomError_1 = require("../util/error/CustomError");
class ComponentDao {
    async getAllComponents(authId) {
        try {
            const components = new Array();
            const documents = await firebase_1.db.collection('users').doc(authId).collection('components').orderBy('name').get();
            documents.forEach(document => {
                const component = new Component_1.Component(document.id, document.data().name, document.data().selectOptions, document.data().selected, document.data().typeId, document.data().values);
                components.push(component);
            });
            return components;
        }
        catch (error) {
            throw new CustomError_1.DatabaseError("Could not retrieve components from database");
        }
    }
    async getComponentById(authId, componentId) {
        try {
            const document = await firebase_1.db.collection('users').doc(authId).collection('components').doc(componentId).get();
            const documentData = document.data();
            const component = new Component_1.Component(document.id, documentData.name, documentData.selectOptions, documentData.selected, documentData.typeId, documentData.values);
            return component;
        }
        catch (error) {
            throw new CustomError_1.DatabaseError("Could not retrieve component from database");
        }
    }
    async addComponents(authId, components) {
        try {
            const existingComponents = await this.getAllComponents(authId);
            const batch = firebase_1.db.batch();
            for (const component of components) {
                const matchingComponent = existingComponents.find(existingComponent => existingComponent.name === component.name);
                const document = matchingComponent ?
                    firebase_1.db.collection('users').doc(authId).collection('components').doc(matchingComponent.id) :
                    firebase_1.db.collection('users').doc(authId).collection('components').doc();
                let { id, ...newComponent } = component;
                batch.set(document, newComponent);
            }
            await batch.commit();
            return;
        }
        catch (error) {
            throw new CustomError_1.DatabaseError("Could not add component to database");
        }
    }
    async updateComponent(authId, componentId, componentData) {
        try {
            await firebase_1.db.collection('users').doc(authId).collection('components').doc(componentId).update(componentData);
        }
        catch (error) {
            throw new CustomError_1.DatabaseError("Could not retrieve update component in database");
        }
    }
    async deleteComponents(authId, componentIds) {
        try {
            const componentsRef = firebase_1.db.collection('users').doc(authId).collection('components');
            const query = componentsRef.where(firebase_1.documentId, 'in', componentIds);
            query.get()
                .then((querySnapshot) => {
                const batch = firebase_1.db.batch();
                querySnapshot.forEach((doc) => {
                    batch.delete(doc.ref);
                });
                return batch.commit();
            });
        }
        catch (error) {
            throw new CustomError_1.DatabaseError("Could not delete components from database");
        }
    }
}
exports.ComponentDao = ComponentDao;
