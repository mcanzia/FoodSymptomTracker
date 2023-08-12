import express, { Express, NextFunction, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import routes from './routes/index';
import Logger from './util/logs/logger';
import { AuthService } from './services/AuthService';
import { ErrorHandler } from './util/error/ErrorHandler';
import { CustomError } from './util/error/CustomError';

const app : Express = express();
const port = process.env.PORT || 8000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors());


// User Authorization
app.use(async (request : Request, response : Response, next : NextFunction) => {
  try {
    const userUID = await AuthService.validateAuthToken(request.headers.authorization)
    response.locals.userAuth = userUID;
    next();
  } catch(error) {
    Logger.error("Authorization attempt failed");
    return response.status(403).json({ error: 'User is not authorized to perform this action' });
  }
});

//Routes Definitions
app.use('/api', routes);

//Error Handling
app.use((error : CustomError, request : Request, response : Response, next : NextFunction) => {
  ErrorHandler.handleError(error, response);
});

/*
app.use((request : Request, response : Response, next : NextFunction) => {
  //response.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
  // move to controller
  response.status(404).render('404', { title: 'Page Not Found' });
})*/

//Server Activation
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});