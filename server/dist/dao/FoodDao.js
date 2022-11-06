"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodDao = void 0;
const firebase_1 = require("../configs/firebase");
const FoodItem_1 = require("../models/FoodItem");
class FoodDao {
    async getAllFoods(authId) {
        try {
            const foodItems = new Array();
            const documents = await firebase_1.db.collection('users').doc(authId).collection('foods').get();
            documents.forEach(document => {
                const foodItem = new FoodItem_1.FoodItem(document.id, document.data().name);
                foodItems.push(foodItem);
            });
            return foodItems;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getFoodById(authId, foodId) {
        try {
            const document = await firebase_1.db.collection('users').doc(authId).collection('foods').doc(foodId).get();
            const documentData = document.data();
            const foodItem = new FoodItem_1.FoodItem(document.id, documentData.name);
            return foodItem;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async addFoods(authId, foodItems) {
        try {
            const existingFoodItems = await this.getAllFoods(authId);
            const batch = firebase_1.db.batch();
            for (const foodItem of foodItems) {
                if (!foodItem.id) {
                    const matchingFoodItem = existingFoodItems.find(existingFoodItem => existingFoodItem.name === foodItem.name);
                    if (matchingFoodItem) {
                        console.log('already exists');
                        continue;
                    }
                    const document = firebase_1.db.collection('users').doc(authId).collection('foods').doc();
                    console.log('new food');
                    let { id, ...newFoodItem } = foodItem;
                    batch.set(document, newFoodItem);
                }
            }
            await batch.commit();
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}
exports.FoodDao = FoodDao;
