"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
//  import jwt from '../helpers/jwt.helper'
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
const auth_1 = __importDefault(require("../middleware/auth"));
const blogFeed_1 = require("../controllers/blogFeed");
// --------------User Routing-------------------
router.get('/getToken', auth_1.default.verifyToken, userController_1.getToken);
router.get('/getAll', userController_1.getAll);
router.get('/getById', auth_1.default.verifyToken, userController_1.getUserById);
router.post('/userCreate', userController_1.userCreate);
router.put('/deactive', auth_1.default.verifyToken, userController_1.deactiveUser);
router.put('/updateProfile', auth_1.default.verifyToken, userController_1.updateProfile);
router.post('/login', userController_1.userLogin);
router.post('/forgotPasswordSendOtp', userController_1.forgotPasswordSendOtp);
router.get('/getDefaultValue', auth_1.default.verifyToken, userController_1.getDefaultValue);
router.post('/insert', auth_1.default.verifyToken, userController_1.insertwidget);
router.get('/getAllWidget', auth_1.default.verifyToken, userController_1.getAllWidget);
router.delete('/deleteWidget/:id', auth_1.default.verifyToken, userController_1.widgetDelete);
router.post('/insertWidget', auth_1.default.verifyToken, userController_1.singleWidgetInsert);
router.get('/widgetmasterGetMcdAcs', auth_1.default.verifyToken, userController_1.widgetmasterGetMcdAcs);
// -------------sentinal-----------------------
router.get('/blogs', blogFeed_1.blogFeed);
router.get('/agent', blogFeed_1.agentsAll);
router.get('/agentActivedirectory', blogFeed_1.agentActivedirectory);
router.get('/agentNetworkinterfaces', blogFeed_1.agentNetworkinterfaces);
router.get('/threats', blogFeed_1.threats);
router.get('/threatAgentDetectionInfo', blogFeed_1.threatAgentDetectionInfo);
router.get('/threatContainerInfo', blogFeed_1.threatContainerInfo);
router.get('/threatAgentRealTimeInfo', blogFeed_1.threatAgentRealTimeInfo);
router.get('/threatKubernetesInfo', blogFeed_1.threatKubernetesInfo);
router.get('/threatMitigationStatus', blogFeed_1.threatMitigationStatus);
router.get('/threatInfo', blogFeed_1.threatInfo);
router.get('/threatIndicators', blogFeed_1.threatIndicators);
// --------------------------exclusion
router.get('/exclusion', blogFeed_1.exclusion);
router.get('/getExclusion', blogFeed_1.getExclusion);
router.get('/report', blogFeed_1.report);
router.get('/getReport', blogFeed_1.getReport);
router.get('/blacklist', blogFeed_1.blacklist);
router.get('/getBlacklist', blogFeed_1.getBlacklist);
module.exports = router;
