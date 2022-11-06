export class ComponentController {
    async getAllComponents(userAuth) {
        try {
            const response = await fetch('http://localhost:7000/api/components', {
                    method: 'GET',
                    headers: {
                        'user-auth': userAuth.uid
                    }
                })
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async getComponentById(userAuth, componentId) {
        try {
            const response = await fetch('http://localhost:7000/api/components/' + componentId, {
                    method: 'GET',
                    headers: {
                        'user-auth': userAuth.uid
                    }
                })
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async addComponents(userAuth, components) {
        try {
            const response = await fetch('http://localhost:7000/api/components', {
                method: 'POST',
                headers: {
                    'user-auth': userAuth.uid,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(components)
            })
            console.log(response.json());
        } catch (error) {
            console.log(error);
        }
    }

    async updateComponent(userAuth, componentId, component) {
        try {
            const response = await fetch('http://localhost:7000/api/components/' + componentId, {
                method: 'PUT',
                headers: {
                    'user-auth': userAuth.uid,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(component)
            })
            console.log(response.json());
        } catch (error) {
            console.log(error);
        }
    }
}
