import { Request, Response, NextFunction } from 'express';
import { vi } from 'vitest';

export class MockExpress {
    static mockRequest = (params?: any, bodyData?: any): Partial<Request> => ({
        params: params,
        body: bodyData
      });
      
    static mockResponse = (userAuthData?: any): Partial<Response> => {
        const res: Partial<Response> = {};
        res.locals = { userAuth: userAuthData };
        res.status = vi.fn().mockReturnValue(res);
        res.json = vi.fn().mockReturnValue(res);
        res.send = vi.fn().mockReturnValue(res);
        return res;
      };
}

