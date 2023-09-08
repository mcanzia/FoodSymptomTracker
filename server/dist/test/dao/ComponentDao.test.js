"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const firebase_1 = require("../../configs/firebase");
const ComponentDaoImpl_1 = require("../../dao/ComponentDaoImpl"); // Assuming a similar structure for Components
const MockComponents_1 = require("../mockData/MockComponents"); // Assuming similar mock data exists for Components
const CustomError_1 = require("../../util/error/CustomError");
(0, vitest_1.describe)('component dao method tests', () => {
    firebase_1.db.useEmulator("localhost", 8080);
    let componentDao;
    let authId = "ABC123";
    let mockComponentData = [];
    (0, vitest_1.beforeEach)(async () => {
        componentDao = new ComponentDaoImpl_1.ComponentDaoImpl();
        mockComponentData = MockComponents_1.MockComponents.createComponentArray();
        mockComponentData.forEach(async (component) => {
            await firebase_1.db.collection('users').doc(authId).collection('components').doc(component.id).set(component);
        });
    });
    (0, vitest_1.describe)('getAllComponents', () => {
        (0, vitest_1.it)('gets all components successfully', async () => {
            const components = await componentDao.getAllComponents(authId);
            (0, vitest_1.expect)(components.length).toBe(3);
            console.log(components);
            (0, vitest_1.expect)(components).toContainEqual(mockComponentData[0]);
            (0, vitest_1.expect)(components).toContainEqual(mockComponentData[1]);
            (0, vitest_1.expect)(components).toContainEqual(mockComponentData[2]);
        });
        (0, vitest_1.it)('handles errors gracefully', async () => {
            const dbMock = vitest_1.vi.spyOn(firebase_1.db, "collection");
            dbMock.mockImplementationOnce(() => { throw new Error("Error Retrieving Components"); });
            await (0, vitest_1.expect)(componentDao.getAllComponents(authId)).rejects.toThrow(CustomError_1.DatabaseError);
        });
    });
    (0, vitest_1.describe)('getComponentById', () => {
        (0, vitest_1.it)('gets component by id successfully', async () => {
            const component = await componentDao.getComponentById(authId, mockComponentData[0].id);
            (0, vitest_1.expect)(component).toEqual(mockComponentData[0]);
        });
        (0, vitest_1.it)('handles errors gracefully', async () => {
            const dbMock = vitest_1.vi.spyOn(firebase_1.db, "collection");
            dbMock.mockImplementationOnce(() => { throw new Error("Error Retrieving Component"); });
            await (0, vitest_1.expect)(componentDao.getComponentById(authId, mockComponentData[0].id)).rejects.toThrow(CustomError_1.DatabaseError);
        });
    });
    (0, vitest_1.describe)('addComponents', () => {
        const newComponentData = MockComponents_1.MockComponents.createComponentArrayTwo();
        (0, vitest_1.it)('adds new components successfully', async () => {
            await componentDao.addComponents(authId, newComponentData);
            const components = await componentDao.getAllComponents(authId);
            (0, vitest_1.expect)(components.length).toBe(6);
        });
        (0, vitest_1.it)('updates existing components successfully', async () => {
            await componentDao.addComponents(authId, mockComponentData);
            const components = await componentDao.getAllComponents(authId);
            (0, vitest_1.expect)(components.length).toBe(3);
            (0, vitest_1.expect)(components).toContainEqual(mockComponentData[0]);
            (0, vitest_1.expect)(components).toContainEqual(mockComponentData[1]);
            (0, vitest_1.expect)(components).toContainEqual(mockComponentData[2]);
        });
        (0, vitest_1.it)('handles errors gracefully', async () => {
            const dbMock = vitest_1.vi.spyOn(firebase_1.db, "collection");
            dbMock.mockImplementationOnce(() => { throw new Error("Error Adding Components"); });
            await (0, vitest_1.expect)(componentDao.addComponents(authId, newComponentData)).rejects.toThrow(CustomError_1.DatabaseError);
        });
    });
    (0, vitest_1.describe)('updateComponents', () => {
        (0, vitest_1.it)('updates component by id successfully', async () => {
            await componentDao.updateComponent(authId, mockComponentData[0].id, mockComponentData[0]);
            const components = await componentDao.getAllComponents(authId);
            (0, vitest_1.expect)(components.length).toBe(3);
            (0, vitest_1.expect)(components).toContainEqual(mockComponentData[0]);
            (0, vitest_1.expect)(components).toContainEqual(mockComponentData[1]);
            (0, vitest_1.expect)(components).toContainEqual(mockComponentData[2]);
        });
        (0, vitest_1.it)('handles errors gracefully', async () => {
            const dbMock = vitest_1.vi.spyOn(firebase_1.db, "collection");
            dbMock.mockImplementationOnce(() => { throw new Error("Error Updating Component"); });
            await (0, vitest_1.expect)(componentDao.updateComponent(authId, mockComponentData[0].id, mockComponentData[0])).rejects.toThrow(CustomError_1.DatabaseError);
        });
    });
    (0, vitest_1.describe)('deleteComponents', () => {
        (0, vitest_1.it)('deletes components successfully', async () => {
            const mockComponentDataIds = mockComponentData.map(mockComponent => mockComponent.id);
            let components = await componentDao.getAllComponents(authId);
            (0, vitest_1.expect)(components.length).toBe(3);
            (0, vitest_1.expect)(components).toContainEqual(mockComponentData[0]);
            (0, vitest_1.expect)(components).toContainEqual(mockComponentData[1]);
            (0, vitest_1.expect)(components).toContainEqual(mockComponentData[2]);
            await componentDao.deleteComponents(authId, mockComponentDataIds);
            components = await componentDao.getAllComponents(authId);
            (0, vitest_1.expect)(components.length).toBe(0);
        });
        (0, vitest_1.it)('handles errors gracefully', async () => {
            const mockComponentDataIds = mockComponentData.map(mockComponent => mockComponent.id);
            const dbMock = vitest_1.vi.spyOn(firebase_1.db, "batch");
            dbMock.mockImplementationOnce(() => { throw new Error("Error Deleting Components"); });
            await (0, vitest_1.expect)(componentDao.deleteComponents(authId, mockComponentDataIds)).rejects.toThrow(CustomError_1.DatabaseError);
        });
    });
    (0, vitest_1.afterEach)(async () => {
        vitest_1.vi.clearAllMocks();
        const componentsRef = firebase_1.db.collection('users').doc(authId).collection('components');
        const snapshot = await componentsRef.get();
        const batch = firebase_1.db.batch();
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();
        await firebase_1.db.collection('users').doc(authId).delete();
    });
});
