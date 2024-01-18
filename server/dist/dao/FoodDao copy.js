"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodDao = void 0;
const firebase_1 = require("../configs/firebase");
const FoodItem_1 = require("../models/FoodItem");
const CustomError_1 = require("../util/error/CustomError");
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
            throw new CustomError_1.DatabaseError("Could not retrieve food items from database");
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
            throw new CustomError_1.DatabaseError("Could not retrieve food item from database");
        }
    }
    async addFoods(authId, foodItems) {
        try {
            const existingFoodItems = await this.getAllFoods(authId);
            const batch = firebase_1.db.batch();
            for (const foodItem of foodItems) {
                const matchingFoodItem = existingFoodItems.find(existingFoodItem => existingFoodItem.name === foodItem.name);
                const document = matchingFoodItem ?
                    firebase_1.db.collection('users').doc(authId).collection('foods').doc(matchingFoodItem.id) :
                    firebase_1.db.collection('users').doc(authId).collection('foods').doc();
                let { id, ...newFoodItem } = foodItem;
                batch.set(document, newFoodItem);
            }
            await batch.commit();
            return;
        }
        catch (error) {
            throw new CustomError_1.DatabaseError("Could not add food item to database");
        }
    }
    async deleteFoods(authId, foodIds) {
        try {
            const foodsRef = firebase_1.db.collection('users').doc(authId).collection('foods');
            const query = foodsRef.where(firebase_1.documentId, 'in', foodIds);
            query.get()
                .then((querySnapshot) => {
                const batch = firebase_1.db.batch();
                querySnapshot.forEach((doc) => {
                    batch.delete(doc.ref);
                });
                return batch.commit();
            });
        }
        catch (error) {
            throw new CustomError_1.DatabaseError("Could not delete foods from database");
        }
    }
}
exports.FoodDao = FoodDao;
