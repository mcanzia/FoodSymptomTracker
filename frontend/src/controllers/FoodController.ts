import { FoodItem } from "../models/FoodItem";
export class FoodController {
    async getAllFoods(userAuthToken : any) {
        try {
            const bearer : string = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7500/api/foods', {
                    method: 'GET',
                    headers: {
                        'Authorization': bearer
                    }
                });
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async getFoodById(userAuthToken : any, foodId : string) {
        try {
            const bearer : string = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7500/api/foods/' + foodId, {
                    method: 'GET',
                    headers: {
                        'Authorization': bearer
                    }
                });
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async addFoods(userAuthToken : any, foods : Array<FoodItem>) {
        try {
            const bearer : string = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7500/api/foods', {
                method: 'POST',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(foods)
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}
