"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv = __importStar(require("dotenv"));
const index_1 = __importDefault(require("./routes/index"));
dotenv.config();
const cron_1 = require("./middleware/cron");
(0, cron_1.cronJob)();
const router = (0, express_1.default)();
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});
// Configure the middleware to serve static content
// const publicPath = path.join(__dirname, '../public');
// router.use(express.static(publicPath));
router.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
router.use((0, morgan_1.default)('dev'));
router.use(express_1.default.urlencoded({ extended: false }));
router.use(express_1.default.json());
// ---------------------------------------------
// --------- Calling Router --------------------
// ------------------------------------------
router.use('/api', index_1.default);
// site
const adminPath = path_1.default.join(__dirname, './admin');
router.use(express_1.default.static(adminPath));
router.get('*', (req, res) => {
    res.sendFile(path_1.default.join(adminPath, 'index.html'));
});
router.use((req, res, next) => {
    const error = new Error('Not found');
    return res.status(404).json({
        message: error.message,
    });
});
exports.default = router;
