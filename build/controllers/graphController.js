"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.infectedEndpoint = exports.securedDeviceByOs = exports.threatsByDetection = exports.threatAging = exports.blogFeed = exports.unresolvedThreat = exports.securedDevicesbyRole = exports.endpointConnectionStatusAgent = exports.agentRequiringAttention = exports.agentVersionCoverage = exports.analystVerdictThreats = exports.incidentStatusThreatinfo = exports.unpatchedAgentinfo = exports.threatInfoDetectionEngine = exports.securedDeviceDomainThreat = exports.securedDeviceThreat = exports.graphincidentStatusDesThreat = exports.severityLevelThreat = exports.analystVerdictDescription = exports.threatByType = void 0;
const db_1 = require("../config/db");
const threatByType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_1.pool.query(`SELECT id, classification AS x, COUNT(*) AS y
       FROM sentinel_threat_threatinfo
       WHERE createdAt >= CURDATE() - INTERVAL 90 DAY
       GROUP BY classification`, function (err, result) {
            if (err) {
                return res.json({
                    status: 400,
                    success: false,
                    data: err,
                });
            }
            const labels = [];
            const series = [];
            result.forEach((item) => {
                labels.push(item.x);
                series.push(item.y);
            });
            return res.json({
                status: 200,
                success: true,
                data: result,
                threadType: {
                    labels: labels,
                    series: series,
                },
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.threatByType = threatByType;
//  example
// SELECT id, classification AS x, COUNT(*) AS y
// FROM sentinel_threat_threatinfo
// WHERE createdAt >= CURDATE() - INTERVAL 30 DAY
// GROUP BY classification
// example
const analystVerdictDescription = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.body);
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT id, analystVerdictDescription AS x, COUNT(*) AS y
             FROM sentinel_threat_threatinfo
             WHERE createdAt >= CURDATE() - INTERVAL 30 DAY 
             GROUP BY analystVerdictDescription`, function (err, result) {
                if (err) {
                    return res.json({
                        status: 400,
                        success: false,
                        data: err,
                    });
                }
                const labels = [];
                const series = [];
                result.forEach((item) => {
                    labels.push(item.x);
                    series.push(item.y);
                });
                return res.json({
                    status: 200,
                    success: true,
                    //    data:result,
                    analystVerdict: {
                        labels: labels,
                        series: series,
                    },
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.analystVerdictDescription = analystVerdictDescription;
const severityLevelThreat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT id, confidenceLevel AS x, COUNT(*) AS y
             FROM sentinel_threat_threatinfo
             WHERE createdAt >= CURDATE() - INTERVAL 30 DAY 
             GROUP BY confidenceLevel`, function (err, result) {
                if (err) {
                    return res.json({
                        status: 400,
                        success: false,
                        data: err,
                    });
                }
                const labels = [];
                const series = [];
                result.forEach((item) => {
                    labels.push(item.x);
                    series.push(item.y);
                });
                return res.json({
                    status: 200,
                    success: true,
                    //    data:result,
                    severityLevelThreat: {
                        labels: labels,
                        series: series,
                    },
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.severityLevelThreat = severityLevelThreat;
const graphincidentStatusDesThreat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT id, incidentStatus AS x, COUNT(*) AS y
             FROM sentinel_threat_threatinfo
             WHERE createdAt >= CURDATE() - INTERVAL 30 DAY 
             GROUP BY incidentStatus`, function (err, result) {
                if (err) {
                    return res.json({
                        status: 400,
                        success: false,
                        data: err,
                    });
                }
                const labels = [];
                const series = [];
                result.forEach((item) => {
                    labels.push(item.x);
                    series.push(item.y);
                });
                return res.json({
                    status: 200,
                    success: true,
                    //    data:result,
                    incidentStatus: {
                        labels: labels,
                        series: series,
                    },
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.graphincidentStatusDesThreat = graphincidentStatusDesThreat;
const securedDeviceThreat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT id, incidentStatus AS x, COUNT(*) AS y
             FROM sentinel_threat_threatinfo 
             GROUP BY incidentStatus`, function (err, result) {
                if (err) {
                    return res.json({
                        status: 400,
                        success: false,
                        data: err,
                    });
                }
                const labels = [];
                const series = [];
                result.forEach((item) => {
                    labels.push(item.x);
                    series.push(item.y);
                });
                return res.json({
                    status: 200,
                    success: true,
                    //    data:result,
                    securedDevice: {
                        labels: labels,
                        series: series,
                    },
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.securedDeviceThreat = securedDeviceThreat;
const securedDeviceDomainThreat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT id, domain AS x, COUNT(*) AS y
             FROM sentinel_agents
             GROUP BY domain`, function (err, result) {
                if (err) {
                    return res.json({
                        status: 400,
                        success: false,
                        data: err,
                    });
                }
                const labels = [];
                const series = [];
                result.forEach((item) => {
                    labels.push(item.x);
                    series.push(item.y);
                });
                return res.json({
                    status: 200,
                    success: true,
                    //    data:result,
                    securedDeviceDomainThreat: {
                        labels: labels,
                        series: series,
                    },
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.securedDeviceDomainThreat = securedDeviceDomainThreat;
//  new
const threatInfoDetectionEngine = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT id, detectionEngines_title AS x, COUNT(*) AS y
             FROM sentinel_threat_threatinfo
             WHERE createdAt >= CURDATE() - INTERVAL 90 DAY 
             GROUP BY detectionEngines_title`, function (err, result) {
                if (err) {
                    return res.json({
                        status: 400,
                        success: false,
                        data: err,
                    });
                }
                const labels = [];
                const series = [];
                result.forEach((item) => {
                    labels.push(item.x);
                    series.push(item.y);
                });
                return res.json({
                    status: 200,
                    success: true,
                    //    data:result,
                    infoDetectionEngine: {
                        labels: labels,
                        series: series,
                    },
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.threatInfoDetectionEngine = threatInfoDetectionEngine;
const unpatchedAgentinfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT id, appsVulnerabilityStatus AS x, COUNT(*) AS y
      FROM sentinel_agents
      GROUP BY appsVulnerabilityStatus`, function (err, result) {
                if (err) {
                    return res.json({
                        status: 400,
                        success: false,
                        data: err,
                    });
                }
                const labels = [];
                const series = [];
                result.forEach((item) => {
                    let label = item.x;
                    if (label === 'up_to_date') {
                        label = 'Up to Date';
                    }
                    else if (label === 'not_applicable') {
                        label = 'N/A';
                    }
                    labels.push(label);
                    series.push(item.y);
                });
                return res.json({
                    status: 200,
                    success: true,
                    unpatchedAgentinfo: {
                        labels: labels,
                        series: series,
                    },
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.unpatchedAgentinfo = unpatchedAgentinfo;
const incidentStatusThreatinfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //  last30days ka data chaiye
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT id, incidentStatus AS x, COUNT(*) AS y
             FROM sentinel_threat_threatinfo 
             GROUP BY incidentStatus`, function (err, result) {
                if (err) {
                    return res.json({
                        status: 400,
                        success: false,
                        data: err,
                    });
                }
                const labels = [];
                const series = [];
                result.forEach((item) => {
                    labels.push(item.x);
                    series.push(item.y);
                });
                return res.json({
                    status: 200,
                    success: true,
                    //    data:result,
                    incidentStatusThreatinfo: {
                        labels: labels,
                        series: series,
                    },
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.incidentStatusThreatinfo = incidentStatusThreatinfo;
const analystVerdictThreats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT id, analystVerdict AS x, COUNT(*) AS y
             FROM sentinel_threat_threatinfo
             WHERE createdAt >= CURDATE() - INTERVAL 30 DAY 
             GROUP BY analystVerdict`, function (err, result) {
                if (err) {
                    return res.json({
                        status: 400,
                        success: false,
                        data: err,
                    });
                }
                const labels = [];
                const series = [];
                result.forEach((item) => {
                    labels.push(item.x);
                    series.push(item.y);
                });
                return res.json({
                    status: 200,
                    //    success:true,
                    data: result,
                    analystVerdictThreats: {
                        labels: labels,
                        series: series,
                    },
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.analystVerdictThreats = analystVerdictThreats;
const agentVersionCoverage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT id, agentVersion AS x, COUNT(*) AS y
             FROM sentinel_agents 
             GROUP BY agentVersion`, function (err, result) {
                if (err) {
                    return res.json({
                        status: 400,
                        success: false,
                        data: err
                    });
                }
                const labels = [];
                const series = [];
                result.forEach((item) => {
                    labels.push(item.x);
                    series.push(item.y);
                });
                return res.json({
                    status: 200,
                    success: true,
                    //    data:result,
                    agentVersionCoverage: {
                        labels: labels,
                        series: series
                    }
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.agentVersionCoverage = agentVersionCoverage;
// 
const agentRequiringAttention = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT id, userActionsNeeded AS x, COUNT(*) AS y
             FROM sentinel_agents 
             GROUP BY userActionsNeeded`, function (err, result) {
                if (err) {
                    return res.json({
                        status: 400,
                        success: false,
                        data: err
                    });
                }
                const labels = [];
                const series = [];
                result.forEach((item) => {
                    // labels.push(item.x); 
                    series.push(item.y);
                });
                return res.json({
                    status: 200,
                    success: true,
                    //    data:result,
                    agentRequiringAttention: {
                        labels: 'missingpermission',
                        series: series
                    }
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.agentRequiringAttention = agentRequiringAttention;
const endpointConnectionStatusAgent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT id, networkStatus AS x, COUNT(*) AS y
             FROM sentinel_agents 
             GROUP BY networkStatus`, function (err, result) {
                if (err) {
                    return res.json({
                        status: 400,
                        success: false,
                        data: err,
                    });
                }
                const labels = [];
                const series = [];
                result.forEach((item) => {
                    labels.push(item.x);
                    series.push(item.y);
                });
                return res.json({
                    status: 200,
                    success: true,
                    //    data:result,
                    endpointConnectionStatusAgent: {
                        labels: labels,
                        series: series,
                    },
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.endpointConnectionStatusAgent = endpointConnectionStatusAgent;
const securedDevicesbyRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT id, machineType AS x, COUNT(*) AS y
             FROM sentinel_agents
             GROUP BY machineType`, function (err, result) {
                if (err) {
                    return res.json({
                        status: 400,
                        success: false,
                        data: err,
                    });
                }
                const labels = [];
                const series = [];
                result.forEach((item) => {
                    labels.push(item.x);
                    series.push(item.y);
                });
                return res.json({
                    status: 200,
                    success: true,
                    //    data:result,
                    securedDevicesbyRole: {
                        labels: labels,
                        series: series,
                    },
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.securedDevicesbyRole = securedDevicesbyRole;
const unresolvedThreat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT id, mitigationStatus AS x, COUNT(*) AS y
             FROM sentinel_threat_threatinfo 
             WHERE createdAt >= CURDATE() - INTERVAL 30 DAY
             GROUP BY mitigationStatus`, function (err, result) {
                if (err) {
                    return res.json({
                        status: 400,
                        success: false,
                        data: err,
                    });
                }
                const labels = [];
                const series = [];
                result.forEach((item) => {
                    labels.push(item.x);
                    series.push(item.y);
                });
                return res.json({
                    status: 200,
                    success: true,
                    //    data:result,
                    unresolvedThreat: {
                        labels: labels,
                        series: series,
                    },
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.unresolvedThreat = unresolvedThreat;
const blogFeed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT * FROM blogs ORDER BY id DESC LIMIT 1`, function (err, result) {
                if (err) {
                    return res.json({
                        status: 400,
                        success: false,
                        data: err,
                    });
                }
                return res.json({
                    status: 200,
                    success: true,
                    data: result,
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.blogFeed = blogFeed;
const threatAging = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT id, createdAt AS x, COUNT(*) AS y
             FROM sentinel_threat_threatinfo 
             GROUP BY createdAt`, function (err, result) {
                if (err) {
                    return res.json({
                        status: 400,
                        success: false,
                        data: err,
                    });
                }
                const labels = [];
                const series = [];
                result.forEach((item) => {
                    labels.push(item.x);
                    series.push(item.y);
                });
                return res.json({
                    status: 200,
                    success: true,
                    //    data:result,
                    threatAging: {
                        labels: labels,
                        series: series,
                    },
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.threatAging = threatAging;
const threatsByDetection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT id, initiatedBy AS x, COUNT(*) AS y
             FROM sentinel_threat_threatinfo 
             GROUP BY initiatedBy`, function (err, result) {
                if (err) {
                    return res.json({
                        status: 400,
                        success: false,
                        data: err,
                    });
                }
                const labels = [];
                const series = [];
                result.forEach((item) => {
                    labels.push(item.x);
                    series.push(item.y);
                });
                return res.json({
                    status: 200,
                    success: true,
                    //    data:result,
                    threatsByDetection: {
                        labels: labels,
                        series: series,
                    },
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.threatsByDetection = threatsByDetection;
const securedDeviceByOs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT id,osType AS x, COUNT(*) AS y
          FROM  sentinel_agents
          GROUP BY osType`, function (err, result) {
                if (err) {
                    return res.json({
                        status: 400,
                        success: false,
                        data: err,
                    });
                }
                const labels = [];
                const series = [];
                result.forEach((item) => {
                    labels.push(item.x);
                    series.push(item.y);
                });
                return res.json({
                    status: 200,
                    success: true,
                    //    data:result,
                    networkinterface: {
                        labels: labels,
                        series: series,
                    },
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.securedDeviceByOs = securedDeviceByOs;
const infectedEndpoint = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT
          id,
          infected AS x,
          COUNT(*) AS y,
          CASE
            WHEN infected = 0 THEN 'healthy'
            WHEN infected = 1 THEN 'infected'
          END AS status
        FROM sentinel_agents
        GROUP BY infected;`, function (err, result) {
                console.log(result, 'result');
                if (err) {
                    return res.json({
                        status: 400,
                        success: false,
                        data: err,
                    });
                }
                const labels = [];
                const series = [];
                result.forEach((item) => {
                    labels.push(item.status);
                    series.push(item.y);
                });
                return res.json({
                    status: 200,
                    success: true,
                    //    data:result,
                    networkinterface: {
                        labels: labels,
                        series: series,
                    },
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.infectedEndpoint = infectedEndpoint;
