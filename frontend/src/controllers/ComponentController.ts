import { Component } from "../models/Component";
export class ComponentController {
    async getAllComponents(userAuthToken : any) {
        try {
            const bearer : string = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7000/api/components', {
                    method: 'GET',
                    headers: {
                        'Authorization': bearer
                    }
                })
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async getComponentById(userAuthToken : any, componentId : string) {
        try {
            const bearer : string = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7000/api/components/' + componentId, {
                    method: 'GET',
                    headers: {
                        'Authorization': bearer
                    }
                })
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async addComponents(userAuthToken : any, components : Array<Component>) {
        try {
            const bearer : string = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7000/api/components', {
                method: 'POST',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(components)
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async updateComponent(userAuthToken : any, component : Component) {
        try {
            const bearer : string = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7000/api/components/' + component.id, {
                method: 'PUT',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(component)
            })
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}
