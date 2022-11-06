import express, { Express, NextFunction, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import routes from './routes/index';

const app : Express = express();
const port = process.env.PORT || 8000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors());

//Routes Definitions
app.use('/api', routes);

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