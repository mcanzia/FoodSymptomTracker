export class FoodController {
    async getAllFoods(userAuthToken) {
        try {
            const bearer = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7500/api/foods', {
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
    async getFoodById(userAuthToken, foodId) {
        try {
            const bearer = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7500/api/foods/' + foodId, {
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
    async addFoods(userAuthToken, foods) {
        try {
            const bearer = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7500/api/foods', {
                method: 'POST',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(foods)
            });
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }
}
//# sourceMappingURL=FoodController.js.map