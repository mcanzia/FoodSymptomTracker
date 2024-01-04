import { ErrorHandler } from "../util/error/ErrorHandler";
import { FoodItem } from "../models/FoodItem";
import { ObjectType } from "../models/ObjectType";
import { RequestUtil } from "./RequestUtil";

export class FoodController {
    
    async getAllFoods(userAuthToken: any) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/foods`;
            const response = await fetch(requestUrl, RequestUtil.GETRequestParams(userAuthToken));
            return response.json();
        } catch (error: any) {
            ErrorHandler.handleGetAllError<FoodItem>(userAuthToken, ObjectType.FOODITEM, error);
        }
    }

    async getFoodById(userAuthToken: any, foodId: string) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/foods/${foodId}`;
            const response = await fetch(requestUrl, RequestUtil.GETRequestParams(userAuthToken));
            return response.json();
        } catch (error: any) {
            ErrorHandler.handleGetByIdError<FoodItem>(userAuthToken, ObjectType.FOODITEM, foodId, error);
        }
    }

    async addFoods(userAuthToken: any, foods: Array<FoodItem>) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/foods`;
            const response = await fetch(requestUrl, RequestUtil.POSTRequestParams(userAuthToken, foods));
            return response;
        } catch (error: any) {
            ErrorHandler.handleAddError<FoodItem>(userAuthToken, ObjectType.FOODITEM, foods, error);
        }
    }

    async deleteFoods(userAuthToken: any, foods: Array<FoodItem>) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/foods`;
            const response = await fetch(requestUrl, RequestUtil.DELETERequestParams(userAuthToken, foods));
            return response;
        } catch (error: any) {
            ErrorHandler.handleDeleteError<FoodItem>(userAuthToken, ObjectType.FOODITEM, foods, error);
        }
    }
}
