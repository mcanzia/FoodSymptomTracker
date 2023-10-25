import { db } from '../configs/firebase';
import { FoodItem } from '../models/FoodItem';
import { DatabaseError } from '../util/error/CustomError';

export class FoodDaoImpl {

    async getAllFoods(authId : any) {   
        try {     
            const foodItems : Array<FoodItem> =  new Array<FoodItem>();    
            const documents = await db.collection('users').doc(authId).collection('foods').get();
            documents.forEach(document => {
                const foodItem : FoodItem = new FoodItem(document.id, document.data().name);
                foodItems.push(foodItem);
            });
            return foodItems;
        } catch (error) {
            throw new DatabaseError("Could not retrieve food items from database");
        }
    }

    async getFoodById(authId : any, foodId : string) {    
        try {    
            const document = await db.collection('users').doc(authId).collection('foods').doc(foodId).get();
            const documentData : any = document.data();
            const foodItem : FoodItem = new FoodItem(document.id, documentData.name);
            return foodItem;
        } catch (error) {
            throw new DatabaseError("Could not retrieve food item from database");
        }
    }

    async addFoods(authId : any, foodItems : Array<FoodItem>) {
        try {
            const existingFoodItems : Array<FoodItem> = await this.getAllFoods(authId);
            const batch = db.batch();
            for (const foodItem of foodItems) {
                const matchingFoodItem = existingFoodItems.find(existingFoodItem => existingFoodItem.name === foodItem.name);
                const document = matchingFoodItem ? 
                    db.collection('users').doc(authId).collection('foods').doc(matchingFoodItem.id) :
                    db.collection('users').doc(authId).collection('foods').doc();
                let {id, ...newFoodItem } = foodItem;
                batch.set(document, newFoodItem);
            }
            await batch.commit();
            return;
        } catch (error) {
            throw new DatabaseError("Could not add food item to database");
        }
    }

    async deleteFoods(authId : any, foodIds : Array<string>) {
        try {
            const batch = db.batch();
            for (const foodId of foodIds) {
                const document = db.collection('users').doc(authId).collection('foods').doc(foodId);
                batch.delete(document);
            }
            await batch.commit();
        } catch (error) {
            throw new DatabaseError("Could not delete foods from database");
        }
    }

}