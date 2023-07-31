"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const tenantRouter_1 = __importDefault(require("./tenantRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
const controlRouter_1 = __importDefault(require("./controlRouter"));
const graphRoutes_1 = __importDefault(require("./graphRoutes"));
const cronTabRouter_1 = __importDefault(require("./cronTabRouter"));
const incidentsRouter_1 = __importDefault(require("./incidentsRouter"));
// import cors from 'cors';
// import  '../controllers//cron'
require("../middleware/cron");
const router = express_1.default.Router();
router.use('/tenants', tenantRouter_1.default);
router.use('/users', userRouter_1.default);
router.use('/controls', controlRouter_1.default);
router.use('/graph', graphRoutes_1.default);
router.use('/cronTab', cronTabRouter_1.default);
router.use('/incidents', incidentsRouter_1.default);
module.exports = router;
