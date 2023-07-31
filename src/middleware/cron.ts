import cron from 'node-cron';
import moment from 'moment';
import moments from 'moment-timezone';
import { pool } from '../config/db';
import {
  blogFeed,
  agentsAll,
  threatAgentDetectionInfo,
  threatAgentRealTimeInfo,
  threatKubernetesInfo,
  threatInfo,
  threatContainerInfo,
  threatMitigationStatus,
  threatIndicators,
  agentActivedirectory,
  agentNetworkinterfaces,
} from '../controllers/blogFeed';

export const cronJob = () => {
  let _cronStartTime = moments(Date.now())
    .tz('Asia/Kolkata')
    .format('DD/MM/YYYY h:mm:ss A');
  console.log('cronjob start at ...' + _cronStartTime);

  const checkTime = pool.query(
    `select time,isActive,cron_function from crontab_config `,
    function (errCron: any, resultCron: any) {
      if (errCron) {
        console.log(errCron);
      }
      if(Array.isArray(resultCron) && resultCron.length > 0){
        for (const cronJob of resultCron) {
          const { time, isActive, cron_function } = cronJob;
          // convert into minutes
          const convertedTime = moment
            .duration(parseInt(time, 10), 'minutes')
            .asMinutes();
  
          if (isActive == 1 && time !== 0) {
            cron.schedule(`*/${convertedTime} * * * *`, () => {
              const req = {} as any;
              const res = {} as any;
              const next = {} as any;
              switch (cron_function) {
                case 'blogFeed':
                  blogFeed(req, res, next);
                  break;
                case 'agentsAll':
                  agentsAll(req, res, next);
                  break;
                case 'threatAgentDetectionInfo':
                  threatAgentDetectionInfo(req, res, next);
                  break;
                case 'threatAgentRealTimeInfo':
                  threatAgentRealTimeInfo(req, res, next);
                  break;
                case 'threatKubernetesInfo':
                  threatKubernetesInfo(req, res, next);
                  break;
                case 'threatInfo':
                  threatInfo(req, res, next);
                  break;
                case 'threatContainerInfo':
                  threatContainerInfo(req, res, next);
                  break;
                case 'threatMitigationStatus':
                  threatMitigationStatus(req, res, next);
                  break;
                case 'threatIndicators':
                  threatIndicators(req, res, next);
                  break;
                case 'agentActivedirectory':
                  agentActivedirectory(req, res, next);
                  break;
                case 'agentNetworkinterfaces':
                  agentNetworkinterfaces(req, res, next);
                  break;
                default:
                  console.log(`Unknown function: ${cron_function}`);
              }
            });
          }
        }
      }
    },
  );
};

// ┌────────────── every second (optional) 0-59
// │ ┌──────────── every minute 0-59
// │ │ ┌────────── every hour 0-23
// │ │ │ ┌──────── every day of month 1-31
// │ │ │ │ ┌────── every month 1-12 (or names)
// │ │ │ │ │ ┌──── every day of week 0-7 (or names, 0 or 7 are sunday)
// │ │ │ │ │ │
// │ │ │ │ │ │
// * * * * * *
