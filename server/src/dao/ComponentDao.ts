import { db } from '../configs/firebase';
import { Component } from '../models/Component';
import { DatabaseError } from '../util/error/CustomError';

export interface ComponentDao {

    getAllComponents(authId : any) : Promise<Component[]>
    getComponentById(authId : any, componentId : string) : Promise<Component>
    addComponents(authId : any, components : Array<Component>) : void;
    updateComponent(authId : any, componentId : string, componentData : Component) : void;
    deleteComponents(authId : any, componentIds : Array<string>) : void;

}