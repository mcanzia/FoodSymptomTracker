import { NextFunction, Request, Response } from 'express';
import { DateLogDao } from '../dao/DateLogDao';

export interface DateLogController {

    dateLogDao : DateLogDao;

    getAllDateLogs(request : Request, response : Response, next : NextFunction) : void;
    getDateLogById(request : Request, response : Response, next : NextFunction) : void;
    addDateLogs(request : Request, response : Response, next : NextFunction) : void;
    updateDateLog(request : Request, response : Response, next : NextFunction) : void;
    deleteDateLogs(request : Request, response : Response, next : NextFunction) : void;

}
