"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const cronTabController_1 = require("../controllers/cronTabController");
const router = express_1.default.Router();
router.get('/cronTableGetAll', cronTabController_1.cronTableGetAll);
router.post('/cronTableUpdate', cronTabController_1.cronTableUpdate);
module.exports = router;
