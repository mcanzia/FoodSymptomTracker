import { RequestType } from "../models/RequestType";
export class RequestUtil {
    static getAPIUrl() {
        return import.meta.env.VITE_SERVER_API_URL ? import.meta.env.VITE_SERVER_API_URL : "https://alimenti-back:7500";
    }
    static GETRequestParams(userAuthToken) {
        const bearer = 'Bearer ' + userAuthToken;
        return {
            method: RequestType.GET,
            headers: {
                'Authorization': bearer
            }
        };
    }
    static POSTRequestParams(userAuthToken, body) {
        const bearer = 'Bearer ' + userAuthToken;
        return {
            method: RequestType.POST,
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };
    }
    static PUTRequestParams(userAuthToken, body) {
        const bearer = 'Bearer ' + userAuthToken;
        return {
            method: RequestType.PUT,
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };
    }
    static DELETERequestParams(userAuthToken, body) {
        const bearer = 'Bearer ' + userAuthToken;
        return {
            method: RequestType.DELETE,
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };
    }
}
//# sourceMappingURL=RequestUtil.js.map