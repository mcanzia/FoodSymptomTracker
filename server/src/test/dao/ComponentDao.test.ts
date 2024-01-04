import { expect, beforeEach, afterEach, describe, it, vi } from 'vitest'
import { db } from '../../configs/firebase';
import { ComponentDaoImpl } from '../../dao/ComponentDaoImpl'; // Assuming a similar structure for Components
import { Component } from '../../models/Component'; // Assuming a similar model exists for Components
import { MockComponents } from '../mockData/MockComponents'; // Assuming similar mock data exists for Components
import { DatabaseError } from '../../util/error/CustomError';

describe('component dao method tests', () => {
  let componentDao: ComponentDaoImpl;
  let authId = "ABC123";
  let mockComponentData : Array<Component> = [];

  beforeEach(async () => {
    componentDao = new ComponentDaoImpl();
    mockComponentData = MockComponents.createComponentArray();
    await Promise.all(mockComponentData.map((component) => {
        return db.collection('users').doc(authId).collection('components').doc(component.id).set(component);
    }));
  });


  describe('getAllComponents', () => {
    it('gets all components successfully', async () => {    
        const components : Array<Component> = await componentDao.getAllComponents(authId);
        expect(components.length).toBe(3);
        expect(components).toContainEqual(mockComponentData[0]);
        expect(components).toContainEqual(mockComponentData[1]);
        expect(components).toContainEqual(mockComponentData[2]);
    })
    it('handles errors gracefully', async() => {
        const dbMock = vi.spyOn(db, "collection");
        dbMock.mockImplementationOnce(() => { throw new Error("Error Retrieving Components") });
        await expect(componentDao.getAllComponents(authId)).rejects.toThrow(DatabaseError);
    })
  });

  describe('getComponentById', () => {
    it('gets component by id successfully', async () => {    
        const component : Component = await componentDao.getComponentById(authId, mockComponentData[0].id);
        expect(component).toEqual(mockComponentData[0]);
    })
    it('handles errors gracefully', async() => {
        const dbMock = vi.spyOn(db, "collection");
        dbMock.mockImplementationOnce(() => { throw new Error("Error Retrieving Component") });
        await expect(componentDao.getComponentById(authId, mockComponentData[0].id)).rejects.toThrow(DatabaseError);
    })
  });

  describe('addComponents', () => {
    const newComponentData : Array<Component> = MockComponents.createComponentArrayTwo();
    it('adds new components successfully', async () => {    
        await componentDao.addComponents(authId, newComponentData);
        const components : Array<Component> = await componentDao.getAllComponents(authId);
        expect(components.length).toBe(6);
    })
    it('updates existing components successfully', async () => {    
        await componentDao.addComponents(authId, mockComponentData);
        const components : Array<Component> = await componentDao.getAllComponents(authId);
        expect(components.length).toBe(3);
        expect(components).toContainEqual(mockComponentData[0]);
        expect(components).toContainEqual(mockComponentData[1]);
        expect(components).toContainEqual(mockComponentData[2]);
    })
    it('handles errors gracefully', async() => {
        const dbMock = vi.spyOn(db, "collection");
        dbMock.mockImplementationOnce(() => { throw new Error("Error Adding Components") });
        await expect(componentDao.addComponents(authId, newComponentData)).rejects.toThrow(DatabaseError);
    })
  });

  describe('updateComponents', () => {
    it('updates component by id successfully', async () => {    
        await componentDao.updateComponent(authId, mockComponentData[0].id, mockComponentData[0]);
        const components : Array<Component> = await componentDao.getAllComponents(authId);
        expect(components.length).toBe(3);
        expect(components).toContainEqual(mockComponentData[0]);
        expect(components).toContainEqual(mockComponentData[1]);
        expect(components).toContainEqual(mockComponentData[2]);
    })
    it('handles errors gracefully', async() => {
        const dbMock = vi.spyOn(db, "collection");
        dbMock.mockImplementationOnce(() => { throw new Error("Error Updating Component") });
        await expect(componentDao.updateComponent(authId, mockComponentData[0].id, mockComponentData[0])).rejects.toThrow(DatabaseError);
    })
  });

  describe('deleteComponents', () => {
    it('deletes components successfully', async () => {   
        const mockComponentDataIds : Array<string> = mockComponentData.map(mockComponent => mockComponent.id);
        let components : Array<Component> = await componentDao.getAllComponents(authId); 
        expect(components.length).toBe(3);
        expect(components).toContainEqual(mockComponentData[0]);
        expect(components).toContainEqual(mockComponentData[1]);
        expect(components).toContainEqual(mockComponentData[2]);
        await componentDao.deleteComponents(authId, mockComponentDataIds);
        components = await componentDao.getAllComponents(authId);
        expect(components.length).toBe(0);
    })
    it('handles errors gracefully', async() => {
        const mockComponentDataIds : Array<string> = mockComponentData.map(mockComponent => mockComponent.id);
        const dbMock = vi.spyOn(db, "batch");
        dbMock.mockImplementationOnce(() => { throw new Error("Error Deleting Components") });
        await expect(componentDao.deleteComponents(authId, mockComponentDataIds)).rejects.toThrow(DatabaseError);
    })
  });

  afterEach(async () => {
    vi.clearAllMocks();
    const componentsRef = db.collection('users').doc(authId).collection('components');
    const snapshot = await componentsRef.get();
    const batch = db.batch();
    snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
    });
    await batch.commit();
    await db.collection('users').doc(authId).delete();
  });
})
