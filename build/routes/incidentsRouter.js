"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const incidentsController_1 = require("../controllers/incidentsController");
const router = express_1.default.Router();
router.post('/getAll', incidentsController_1.incidents);
module.exports = router;
