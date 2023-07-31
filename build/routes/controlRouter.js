"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const controlsController_1 = require("../controllers/controlsController");
const router = express_1.default.Router();
router.get("/get", controlsController_1.getControls);
module.exports = router;
