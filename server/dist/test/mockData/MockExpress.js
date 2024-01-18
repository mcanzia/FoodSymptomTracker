"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockExpress = void 0;
const vitest_1 = require("vitest");
class MockExpress {
    static mockRequest = (params, bodyData) => ({
        params: params,
        body: bodyData
    });
    static mockResponse = (userAuthData) => {
        const res = {};
        res.locals = { userAuth: userAuthData };
        res.status = vitest_1.vi.fn().mockReturnValue(res);
        res.json = vitest_1.vi.fn().mockReturnValue(res);
        res.send = vitest_1.vi.fn().mockReturnValue(res);
        return res;
    };
}
exports.MockExpress = MockExpress;
