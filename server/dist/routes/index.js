"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const foods_1 = __importDefault(require("./foods"));
const datelogs_1 = __importDefault(require("./datelogs"));
const components_1 = __importDefault(require("./components"));
const charts_1 = __importDefault(require("./charts"));
const router = express_1.default.Router();
router.use(express_1.default.json());
router.use('/foods', foods_1.default);
router.use('/datelogs', datelogs_1.default);
router.use('/components', components_1.default);
router.use('/charts', charts_1.default);
exports.default = router;
