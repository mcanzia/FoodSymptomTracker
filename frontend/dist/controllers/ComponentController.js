export class ComponentController {
    async getAllComponents(userAuthToken) {
        try {
            const bearer = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7500/api/components', {
                method: 'GET',
                headers: {
                    'Authorization': bearer
                }
            });
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }
    async getComponentById(userAuthToken, componentId) {
        try {
            const bearer = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7500/api/components/' + componentId, {
                method: 'GET',
                headers: {
                    'Authorization': bearer
                }
            });
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }
    async addComponents(userAuthToken, components) {
        try {
            const bearer = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7500/api/components', {
                method: 'POST',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(components)
            });
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateComponent(userAuthToken, component) {
        try {
            const bearer = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7500/api/components/' + component.id, {
                method: 'PUT',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(component)
            });
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }
}
//# sourceMappingURL=ComponentController.js.map