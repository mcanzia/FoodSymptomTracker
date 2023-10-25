"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const firebase_1 = require("../../configs/firebase");
const AuthServiceImpl_1 = require("../../services/AuthServiceImpl");
const CustomError_1 = require("../../util/error/CustomError");
(0, vitest_1.describe)('auth service method tests', () => {
    (0, vitest_1.beforeEach)(async () => {
        firebase_1.testauth.useEmulator("http://localhost:9099/");
    });
    (0, vitest_1.it)('validates auth token successfully', async () => {
        const mockUID = "user1234";
        const firebaseAdminMock = vitest_1.vi.spyOn(firebase_1.firebaseAdmin.auth(), "verifyIdToken");
        firebaseAdminMock.mockResolvedValueOnce({ uid: mockUID });
        const result = await AuthServiceImpl_1.AuthServiceImpl.validateAuthToken("Bearer SomeToken");
        (0, vitest_1.expect)(result).toBe(mockUID);
    });
    (0, vitest_1.it)('checks that auth token is not null or empty', async () => {
        await (0, vitest_1.expect)(AuthServiceImpl_1.AuthServiceImpl.validateAuthToken(null)).rejects.toThrow(CustomError_1.AuthorizationError);
        await (0, vitest_1.expect)(AuthServiceImpl_1.AuthServiceImpl.validateAuthToken("")).rejects.toThrow(CustomError_1.AuthorizationError);
    });
    (0, vitest_1.it)('throws AuthorizationError when bearer token does not start with "Bearer "', async () => {
        await (0, vitest_1.expect)(AuthServiceImpl_1.AuthServiceImpl.validateAuthToken("RandomToken")).rejects.toThrow(CustomError_1.AuthorizationError);
    });
    (0, vitest_1.it)('throws AuthorizationError when verifyIdToken fails', async () => {
        const firebaseAdminMock = vitest_1.vi.spyOn(firebase_1.firebaseAdmin.auth(), "verifyIdToken");
        firebaseAdminMock.mockRejectedValueOnce(new Error("Mock error"));
        await (0, vitest_1.expect)(AuthServiceImpl_1.AuthServiceImpl.validateAuthToken("Bearer SomeToken")).rejects.toThrow(CustomError_1.AuthorizationError);
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
});
