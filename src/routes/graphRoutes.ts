import express from 'express';
import {infectedEndpoint,securedDeviceByOs,threatByType,analystVerdictDescription,graphincidentStatusDesThreat ,securedDeviceThreat,securedDeviceDomainThreat,
    threatInfoDetectionEngine,unpatchedAgentinfo,incidentStatusThreatinfo,analystVerdictThreats,
    agentVersionCoverage,agentRequiringAttention,endpointConnectionStatusAgent,securedDevicesbyRole,
    unresolvedThreat,threatsByDetection,threatAging,blogFeed,severityLevelThreat   } from '../controllers/graphController';


const router = express.Router();

router.get("/threatByType",threatByType);
router.get("/analystVerdictDescription",analystVerdictDescription)
router.get('/incidentStatusDesThreat',graphincidentStatusDesThreat )
router.get('/securedDeviceThreat',securedDeviceThreat)
router.get('/securedDeviceDomainThreat',securedDeviceDomainThreat)
// 
router.get('/threatInfoDetectionEngine',threatInfoDetectionEngine)
router.get('/unpatchedAgentinfo',unpatchedAgentinfo)
router.get('/incidentStatusThreatinfo',incidentStatusThreatinfo)
router.get('/analystVerdictThreats',analystVerdictThreats)
router.get('/severityLevelThreat',severityLevelThreat)

router.get('/agentVersionCoverage',agentVersionCoverage)
router.get('/agentRequiringAttention',agentRequiringAttention)
router.get('/endpointConnectionStatusAgent',endpointConnectionStatusAgent)
router.get('/securedDevicesbyRole',securedDevicesbyRole)
router.get('/unresolvedThreat',unresolvedThreat)
router.get('/blogFeed',blogFeed)
router.get('/threatAging',threatAging)
router.get('/threatsByDetection',threatsByDetection)
// router.get('/blogFeed',blogFeed)
router.get('/securedDeviceByOs',securedDeviceByOs)
router.get('/infectedEndpoint',infectedEndpoint)
// router.get('/',)

export= router;