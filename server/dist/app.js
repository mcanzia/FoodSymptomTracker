"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const index_1 = __importDefault(require("./routes/index"));
const logger_1 = __importDefault(require("./util/logs/logger"));
const ErrorHandler_1 = require("./util/error/ErrorHandler");
const AuthServiceImpl_1 = require("./services/AuthServiceImpl");
const app = (0, express_1.default)();
const port = Number(process.env.VITE_PORT) || 7500;
// Middleware
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
// Security
app.use((0, cors_1.default)());
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 200 // limit each IP to 100 requests per 15 minutes
});
app.use(limiter);
// User Authorization
app.use(async (request, response, next) => {
    try {
        const userUID = await AuthServiceImpl_1.AuthServiceImpl.validateAuthToken(request.headers.authorization);
        response.locals.userAuth = userUID;
        next();
    }
    catch (error) {
        logger_1.default.error("Authorization attempt failed");
        return response.status(403).json({ error: 'User is not authorized to perform this action' });
    }
});
//Routes Definitions
app.use('/api', index_1.default);
//Error Handling
app.use((error, request, response, next) => {
    ErrorHandler_1.ErrorHandler.handleError(error, response);
});
/*
app.use((request : Request, response : Response, next : NextFunction) => {
  //response.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
  // move to controller
  response.status(404).render('404', { title: 'Page Not Found' });
})*/
// if (process.env.ENV === 'development') {
app.listen(port, () => {
    logger_1.default.info(`Listen to requests on http://localhost:${port}`);
});
// } else {
//   //HTTPS Setup
//   const privateKey = fs.readFileSync('/etc/ssl/private/alimenti-back.key', 'utf8');
//   const certificate = fs.readFileSync('/etc/ssl/certs/alimenti-back.crt', 'utf8');
//   const credentials = { key: privateKey, cert: certificate };
//   const httpsServer = https.createServer(credentials, app);
//   //Server Activation
//   httpsServer.listen(443, () => {
//     Logger.info(`Listening to requests on http://localhost:443`);
//   });
// }
