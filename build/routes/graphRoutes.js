"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const graphController_1 = require("../controllers/graphController");
const router = express_1.default.Router();
router.get("/threatByType", graphController_1.threatByType);
router.get("/analystVerdictDescription", graphController_1.analystVerdictDescription);
router.get('/incidentStatusDesThreat', graphController_1.graphincidentStatusDesThreat);
router.get('/securedDeviceThreat', graphController_1.securedDeviceThreat);
router.get('/securedDeviceDomainThreat', graphController_1.securedDeviceDomainThreat);
// 
router.get('/threatInfoDetectionEngine', graphController_1.threatInfoDetectionEngine);
router.get('/unpatchedAgentinfo', graphController_1.unpatchedAgentinfo);
router.get('/incidentStatusThreatinfo', graphController_1.incidentStatusThreatinfo);
router.get('/analystVerdictThreats', graphController_1.analystVerdictThreats);
router.get('/severityLevelThreat', graphController_1.severityLevelThreat);
router.get('/agentVersionCoverage', graphController_1.agentVersionCoverage);
router.get('/agentRequiringAttention', graphController_1.agentRequiringAttention);
router.get('/endpointConnectionStatusAgent', graphController_1.endpointConnectionStatusAgent);
router.get('/securedDevicesbyRole', graphController_1.securedDevicesbyRole);
router.get('/unresolvedThreat', graphController_1.unresolvedThreat);
router.get('/blogFeed', graphController_1.blogFeed);
router.get('/threatAging', graphController_1.threatAging);
router.get('/threatsByDetection', graphController_1.threatsByDetection);
// router.get('/blogFeed',blogFeed)
router.get('/securedDeviceByOs', graphController_1.securedDeviceByOs);
router.get('/infectedEndpoint', graphController_1.infectedEndpoint);
module.exports = router;
