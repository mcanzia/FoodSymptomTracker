import express, { Express, NextFunction, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import rateLimit from 'express-rate-limit';
import routes from './routes/index';
import Logger from './util/logs/logger';
import { ErrorHandler } from './util/error/ErrorHandler';
import { CustomError } from './util/error/CustomError';
import { AuthServiceImpl } from './services/AuthServiceImpl';

const app : Express = express();
const port : number = Number(process.env.VITE_PORT) || 7500;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

  // Security
app.use(cors());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per 15 minutes
});
app.use(limiter);

// User Authorization
app.use(async (request : Request, response : Response, next : NextFunction) => {
  try {
    const userUID = await AuthServiceImpl.validateAuthToken(request.headers.authorization)
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

if (process.env.ENV === 'development') {
  app.listen(port, () => {
    Logger.info(`Listen to requests on http://localhost:${port}`);
  });
} else {
  //HTTPS Setup
  const privateKey = fs.readFileSync('alimenti-back.key', 'utf8');
  const certificate = fs.readFileSync('alimenti-back.crt', 'utf8');
  const credentials = { key: privateKey, cert: certificate };
  const httpsServer = https.createServer(credentials, app);

  //Server Activation
  httpsServer.listen(443, () => {
    Logger.info(`Listening to requests on http://localhost:443`);
  });
}

