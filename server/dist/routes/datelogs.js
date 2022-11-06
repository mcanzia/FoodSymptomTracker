"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DateLogController_1 = require("../controllers/DateLogController");
const router = express_1.default.Router();
const dateLogController = new DateLogController_1.DateLogController();
router.get('/', dateLogController.getAllDateLogs);
router.get('/:dateLogId', dateLogController.getDateLogById);
router.post('/', dateLogController.addDateLogs);
router.put('/:dateLogId', dateLogController.updateDateLog);
exports.default = router;
