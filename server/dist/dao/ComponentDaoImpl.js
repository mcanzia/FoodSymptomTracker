"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentDaoImpl = void 0;
const firebase_1 = require("../configs/firebase");
const Component_1 = require("../models/Component");
const Option_1 = require("../models/Option");
const CustomError_1 = require("../util/error/CustomError");
const logger_1 = __importDefault(require("../util/logs/logger"));
class ComponentDaoImpl {
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
            throw new CustomError_1.DatabaseError("Could not retrieve components from database: " + error);
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
            throw new CustomError_1.DatabaseError("Could not retrieve component from database: " + error);
        }
    }
    async addComponents(authId, components) {
        try {
            const existingComponents = await this.getAllComponents(authId);
            const batch = firebase_1.db.batch();
            for (const component of components) {
                const matchingComponent = existingComponents.find(existingComponent => existingComponent.id === component.id);
                const document = matchingComponent ?
                    firebase_1.db.collection('users').doc(authId).collection('components').doc(matchingComponent.id) :
                    firebase_1.db.collection('users').doc(authId).collection('components').doc();
                const serializedComponent = component.toObject ? component.toObject() : component;
                let { id, ...newComponent } = serializedComponent;
                batch.set(document, newComponent);
            }
            await batch.commit();
            return;
        }
        catch (error) {
            throw new CustomError_1.DatabaseError("Could not add component to database: " + error);
        }
    }
    async updateComponent(authId, componentId, componentData) {
        try {
            const dataToUpdate = componentData.toObject ? componentData.toObject() : componentData;
            await firebase_1.db.collection('users').doc(authId).collection('components').doc(componentId).update(dataToUpdate);
        }
        catch (error) {
            throw new CustomError_1.DatabaseError("Could not retrieve update component in database: " + error);
        }
    }
    async deleteComponents(authId, componentIds) {
        try {
            const batch = firebase_1.db.batch();
            for (const componentId of componentIds) {
                const document = firebase_1.db.collection('users').doc(authId).collection('components').doc(componentId);
                batch.delete(document);
            }
            await batch.commit();
        }
        catch (error) {
            throw new CustomError_1.DatabaseError("Could not delete components from database: " + error);
        }
    }
    async addNewUserComponents(authId) {
        try {
            logger_1.default.info("Adding new user components for user: " + authId);
            const components = [
                new Component_1.Component('', "Pain Level", [], true, 1, [5]),
                new Component_1.Component('', "Trouble Sleeping?", [
                    new Option_1.Option("Not at all", "Not at all"),
                    new Option_1.Option("Somewhat", "Somewhat"),
                    new Option_1.Option("All night", "All night")
                ], true, 2, []),
                new Component_1.Component('', "Symptoms", [
                    new Option_1.Option("Headache", "Headache"),
                    new Option_1.Option("Bloating", "Bloating"),
                    new Option_1.Option("Heart Burn", "Heart Burn")
                ], true, 3, [])
            ];
            await this.addComponents(authId, components);
            logger_1.default.info("Successfully added components");
        }
        catch (error) {
            throw new CustomError_1.DatabaseError("Could not add new user components: " + error);
        }
    }
}
exports.ComponentDaoImpl = ComponentDaoImpl;
