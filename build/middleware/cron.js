"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronJob = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const moment_1 = __importDefault(require("moment"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const db_1 = require("../config/db");
const blogFeed_1 = require("../controllers/blogFeed");
const cronJob = () => {
    let _cronStartTime = (0, moment_timezone_1.default)(Date.now())
        .tz('Asia/Kolkata')
        .format('DD/MM/YYYY h:mm:ss A');
    console.log('cronjob start at ...' + _cronStartTime);
    const checkTime = db_1.pool.query(`select time,isActive,cron_function from crontab_config `, function (errCron, resultCron) {
        if (errCron) {
            console.log(errCron);
        }
        if (Array.isArray(resultCron) && resultCron.length > 0) {
            for (const cronJob of resultCron) {
                const { time, isActive, cron_function } = cronJob;
                // convert into minutes
                const convertedTime = moment_1.default
                    .duration(parseInt(time, 10), 'minutes')
                    .asMinutes();
                if (isActive == 1 && time !== 0) {
                    node_cron_1.default.schedule(`*/${convertedTime} * * * *`, () => {
                        const req = {};
                        const res = {};
                        const next = {};
                        switch (cron_function) {
                            case 'blogFeed':
                                (0, blogFeed_1.blogFeed)(req, res, next);
                                break;
                            case 'agentsAll':
                                (0, blogFeed_1.agentsAll)(req, res, next);
                                break;
                            case 'threatAgentDetectionInfo':
                                (0, blogFeed_1.threatAgentDetectionInfo)(req, res, next);
                                break;
                            case 'threatAgentRealTimeInfo':
                                (0, blogFeed_1.threatAgentRealTimeInfo)(req, res, next);
                                break;
                            case 'threatKubernetesInfo':
                                (0, blogFeed_1.threatKubernetesInfo)(req, res, next);
                                break;
                            case 'threatInfo':
                                (0, blogFeed_1.threatInfo)(req, res, next);
                                break;
                            case 'threatContainerInfo':
                                (0, blogFeed_1.threatContainerInfo)(req, res, next);
                                break;
                            case 'threatMitigationStatus':
                                (0, blogFeed_1.threatMitigationStatus)(req, res, next);
                                break;
                            case 'threatIndicators':
                                (0, blogFeed_1.threatIndicators)(req, res, next);
                                break;
                            case 'agentActivedirectory':
                                (0, blogFeed_1.agentActivedirectory)(req, res, next);
                                break;
                            case 'agentNetworkinterfaces':
                                (0, blogFeed_1.agentNetworkinterfaces)(req, res, next);
                                break;
                            default:
                                console.log(`Unknown function: ${cron_function}`);
                        }
                    });
                }
            }
        }
    });
};
exports.cronJob = cronJob;
// ┌────────────── every second (optional) 0-59
// │ ┌──────────── every minute 0-59
// │ │ ┌────────── every hour 0-23
// │ │ │ ┌──────── every day of month 1-31
// │ │ │ │ ┌────── every month 1-12 (or names)
// │ │ │ │ │ ┌──── every day of week 0-7 (or names, 0 or 7 are sunday)
// │ │ │ │ │ │
// │ │ │ │ │ │
// * * * * * *
