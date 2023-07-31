import express from 'express';
//  import jwt from '../helpers/jwt.helper'
import {
  getToken,
  deactiveUser,
  forgotPasswordSendOtp,
  getAll,
  getAllWidget,
  getDefaultValue,
  getUserById,
  insertwidget,
  singleWidgetInsert,
  updateProfile,
  userCreate,
  userLogin,
  widgetDelete,
  widgetmasterGetMcdAcs,
} from '../controllers/userController';
const router = express.Router();
import Auth from '../middleware/auth';

import {
  
  agentsAll,
  blogFeed,
  exclusion,
  threatAgentDetectionInfo,
  threatAgentRealTimeInfo,
  threatContainerInfo,
  threatIndicators,
  threatInfo,
  threatKubernetesInfo,
  threatMitigationStatus,
  threats,
  blacklist,
  getBlacklist,
  getExclusion,
  agentActivedirectory,
  agentNetworkinterfaces,
  report,
  getReport,
} from '../controllers/blogFeed';

// --------------User Routing-------------------
router.get('/getToken', Auth.verifyToken,getToken);
router.get('/getAll', getAll);
router.get('/getById', Auth.verifyToken, getUserById);
router.post('/userCreate', userCreate);
router.put('/deactive', Auth.verifyToken, deactiveUser);
router.put('/updateProfile', Auth.verifyToken, updateProfile);
router.post('/login', userLogin);
router.post('/forgotPasswordSendOtp', forgotPasswordSendOtp);
router.get('/getDefaultValue', Auth.verifyToken, getDefaultValue);
router.post('/insert', Auth.verifyToken, insertwidget);
router.get('/getAllWidget', Auth.verifyToken, getAllWidget);
router.delete('/deleteWidget/:id', Auth.verifyToken, widgetDelete);
router.post('/insertWidget', Auth.verifyToken, singleWidgetInsert);
router.get('/widgetmasterGetMcdAcs', Auth.verifyToken, widgetmasterGetMcdAcs);
// -------------sentinal-----------------------
router.get('/blogs', blogFeed);
router.get('/agent', agentsAll);
router.get('/agentActivedirectory', agentActivedirectory);
router.get('/agentNetworkinterfaces', agentNetworkinterfaces);
router.get('/threats', threats);
router.get('/threatAgentDetectionInfo', threatAgentDetectionInfo);
router.get('/threatContainerInfo', threatContainerInfo);
router.get('/threatAgentRealTimeInfo', threatAgentRealTimeInfo);
router.get('/threatKubernetesInfo', threatKubernetesInfo);
router.get('/threatMitigationStatus', threatMitigationStatus);
router.get('/threatInfo', threatInfo);
router.get('/threatIndicators', threatIndicators);
// --------------------------exclusion
router.get('/exclusion', exclusion);
router.get('/getExclusion', getExclusion);
router.get('/report', report);
router.get('/getReport', getReport);
router.get('/blacklist', blacklist);
router.get('/getBlacklist', getBlacklist);

//  router.get("/blogFeedAuthor",blogFeedAuthor)

export = router;
