import { ErrorHandler } from "../util/error/ErrorHandler";
import { ObjectType } from "../models/ObjectType";
import { RequestUtil } from "./RequestUtil";
export class FoodController {
    async getAllFoods(userAuthToken) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/foods`;
            const response = await fetch(requestUrl, RequestUtil.GETRequestParams(userAuthToken));
            return response.json();
        }
        catch (error) {
            ErrorHandler.handleGetAllError(userAuthToken, ObjectType.FOODITEM, error);
        }
    }
    async getFoodById(userAuthToken, foodId) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/foods/${foodId}`;
            const response = await fetch(requestUrl, RequestUtil.GETRequestParams(userAuthToken));
            return response.json();
        }
        catch (error) {
            ErrorHandler.handleGetByIdError(userAuthToken, ObjectType.FOODITEM, foodId, error);
        }
    }
    async addFoods(userAuthToken, foods) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/foods`;
            const response = await fetch(requestUrl, RequestUtil.POSTRequestParams(userAuthToken, foods));
            return response;
        }
        catch (error) {
            ErrorHandler.handleAddError(userAuthToken, ObjectType.FOODITEM, foods, error);
        }
    }
    async deleteFoods(userAuthToken, foods) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/foods`;
            const response = await fetch(requestUrl, RequestUtil.DELETERequestParams(userAuthToken, foods));
            return response;
        }
        catch (error) {
            ErrorHandler.handleDeleteError(userAuthToken, ObjectType.FOODITEM, foods, error);
        }
    }
}
//# sourceMappingURL=FoodController.js.map