export class FoodController {
    async getAllFoods(userAuth) {
        try {
            const response = await fetch('http://localhost:7000/api/foods', {
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

    async getFoodById(userAuth, foodId) {
        try {
            const response = await fetch('http://localhost:7000/api/foods/' + foodId, {
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

    async addFoods(userAuth, foods) {
        try {
            const response = await fetch('http://localhost:7000/api/foods', {
                method: 'POST',
                headers: {
                    'user-auth': userAuth.uid,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(foods)
            })
            console.log(response.json());
        } catch (error) {
            console.log(error);
        }
    }
}
