"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const AuthService_1 = require("./services/AuthService");
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
// Middleware
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use((0, cors_1.default)());
// User Authorization
app.use(async (request, response, next) => {
    try {
        const userUID = await AuthService_1.AuthService.validateAuthToken(request.headers.authorization);
        response.locals.userAuth = userUID;
        next();
    }
    catch (error) {
        return response.status(403).json({ error: 'User is not authorized to perform this action' });
    }
});
//Routes Definitions
app.use('/api', index_1.default);
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
