import { Request, Response, NextFunction } from 'express';
import { pool } from '../config/db';
import { resolve } from 'path';
import { rejects } from 'assert';

export const threatByType = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    pool.query(
      `SELECT id, classification AS x, COUNT(*) AS y
       FROM sentinel_threat_threatinfo
       WHERE createdAt >= CURDATE() - INTERVAL 90 DAY
       GROUP BY classification`,
      function (err: any, result: any) {
        if (err) {
          return res.json({
            status: 400,
            success: false,
            data: err,
          });
        }

        const labels: any[] = [];
        const series: any[] = [];

        result.forEach((item: any) => {
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
      },
    );
  } catch (error) {
    console.log(error);
  }
};
//  example
// SELECT id, classification AS x, COUNT(*) AS y
// FROM sentinel_threat_threatinfo
// WHERE createdAt >= CURDATE() - INTERVAL 30 DAY
// GROUP BY classification

// example

export const analystVerdictDescription = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // console.log(req.body);
    const check = await new Promise((resolve, rejects) => {
      pool.query(
        `SELECT id, analystVerdictDescription AS x, COUNT(*) AS y
             FROM sentinel_threat_threatinfo
             WHERE createdAt >= CURDATE() - INTERVAL 30 DAY 
             GROUP BY analystVerdictDescription`,
        function (err: any, result: any) {
          if (err) {
            return res.json({
              status: 400,
              success: false,
              data: err,
            });
          }
          const labels: any[] = [];
          const series: any[] = [];

          result.forEach((item: any) => {
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
        },
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const severityLevelThreat = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await new Promise((resolve, rejects) => {
      pool.query(
        `SELECT id, confidenceLevel AS x, COUNT(*) AS y
             FROM sentinel_threat_threatinfo
             WHERE createdAt >= CURDATE() - INTERVAL 30 DAY 
             GROUP BY confidenceLevel`,
        function (err: any, result: any) {
          if (err) {
            return res.json({
              status: 400,
              success: false,
              data: err,
            });
          }
          const labels: any[] = [];
          const series: any[] = [];

          result.forEach((item: any) => {
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
        },
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const graphincidentStatusDesThreat = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await new Promise((resolve, rejects) => {
      pool.query(
        `SELECT id, incidentStatus AS x, COUNT(*) AS y
             FROM sentinel_threat_threatinfo
             WHERE createdAt >= CURDATE() - INTERVAL 30 DAY 
             GROUP BY incidentStatus`,
        function (err: any, result: any) {
          if (err) {
            return res.json({
              status: 400,
              success: false,
              data: err,
            });
          }

          const labels: any[] = [];
          const series: any[] = [];

          result.forEach((item: any) => {
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
        },
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const securedDeviceThreat = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await new Promise((resolve, rejects) => {
      pool.query(
        `SELECT id, incidentStatus AS x, COUNT(*) AS y
             FROM sentinel_threat_threatinfo 
             GROUP BY incidentStatus`,
        function (err: any, result: any) {
          if (err) {
            return res.json({
              status: 400,
              success: false,
              data: err,
            });
          }
          const labels: any[] = [];
          const series: any[] = [];

          result.forEach((item: any) => {
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
        },
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const securedDeviceDomainThreat = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await new Promise((resolve, rejects) => {
      pool.query(
        `SELECT id, domain AS x, COUNT(*) AS y
             FROM sentinel_agents
             GROUP BY domain`,
        function (err: any, result: any) {
          if (err) {
            return res.json({
              status: 400,
              success: false,
              data: err,
            });
          }
          const labels: any[] = [];
          const series: any[] = [];

          result.forEach((item: any) => {
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
        },
      );
    });
  } catch (error) {
    console.log(error);
  }
};

//  new

export const threatInfoDetectionEngine = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await new Promise((resolve, rejects) => {
      pool.query(
        `SELECT id, detectionEngines_title AS x, COUNT(*) AS y
             FROM sentinel_threat_threatinfo
             WHERE createdAt >= CURDATE() - INTERVAL 90 DAY 
             GROUP BY detectionEngines_title`,
        function (err: any, result: any) {
          if (err) {
            return res.json({
              status: 400,
              success: false,
              data: err,
            });
          }
          const labels: any[] = [];
          const series: any[] = [];

          result.forEach((item: any) => {
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
        },
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const unpatchedAgentinfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await new Promise((resolve, rejects) => {
      pool.query(
        `SELECT id, appsVulnerabilityStatus AS x, COUNT(*) AS y
      FROM sentinel_agents
      GROUP BY appsVulnerabilityStatus`,
        function (err: any, result: any) {
          if (err) {
            return res.json({
              status: 400,
              success: false,
              data: err,
            });
          }
          const labels: any[] = [];
          const series: any[] = [];

          result.forEach((item: any) => {
            let label = item.x;
            if (label === 'up_to_date') {
              label = 'Up to Date';
            } else if (label === 'not_applicable') {
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
        },
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const incidentStatusThreatinfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //  last30days ka data chaiye
    const check = await new Promise((resolve, rejects) => {
      pool.query(
        `SELECT id, incidentStatus AS x, COUNT(*) AS y
             FROM sentinel_threat_threatinfo 
             GROUP BY incidentStatus`,
        function (err: any, result: any) {
          if (err) {
            return res.json({
              status: 400,
              success: false,
              data: err,
            });
          }
          const labels: any[] = [];
          const series: any[] = [];

          result.forEach((item: any) => {
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
        },
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const analystVerdictThreats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await new Promise((resolve, rejects) => {
      pool.query(
        `SELECT id, analystVerdict AS x, COUNT(*) AS y
             FROM sentinel_threat_threatinfo
             WHERE createdAt >= CURDATE() - INTERVAL 30 DAY 
             GROUP BY analystVerdict`,
        function (err: any, result: any) {
          if (err) {
            return res.json({
              status: 400,
              success: false,
              data: err,
            });
          }
          const labels: any[] = [];
          const series: any[] = [];

          result.forEach((item: any) => {
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
        },
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const agentVersionCoverage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await new Promise((resolve, rejects) => {
      pool.query(
        `SELECT id, agentVersion AS x, COUNT(*) AS y
             FROM sentinel_agents 
             GROUP BY agentVersion`,function(err:any,result:any){
                  if(err){
                     return res.json({
                          status:400,
                          success:false,
                          data:err
                     })
                  }
                  const labels: any[] = [];
                  const series: any[] = [];
            
                  result.forEach((item: any) => {
                    labels.push(item.x); 
                    series.push(item.y); 
                  });
                  return res.json({
                       status:200,
                       success:true,
                    //    data:result,
                       agentVersionCoverage: {
                         labels: labels,
                         series: series
                     }
                  })
             })
        })
         
     } catch (error) {
         console.log(error);
         
     }
 }
// 
 export const agentRequiringAttention = async(req:Request,res:Response,next:NextFunction)=>{
     try {
         
         const check = await new Promise((resolve,rejects)=>{
             pool.query(`SELECT id, userActionsNeeded AS x, COUNT(*) AS y
             FROM sentinel_agents 
             GROUP BY userActionsNeeded`,function(err:any,result:any){
                  if(err){
                     return res.json({
                          status:400,
                          success:false,
                          data:err
                     })
                  }
                  const labels: any[] = [];
                  const series: any[] = [];
            
                  result.forEach((item: any) => {
                    // labels.push(item.x); 
                    series.push(item.y); 
                  });
                  return res.json({
                       status:200,
                       success:true,
                    //    data:result,
                       agentRequiringAttention: {
                         labels: 'missingpermission',
                         series: series
                     }
                  })
             })
        })
         
     } catch (error) {
         console.log(error);
         
     }
 }
 
export const endpointConnectionStatusAgent = async(req:Request,res:Response,next:NextFunction)=>{
     try {
         
         const check = await new Promise((resolve,rejects)=>{
             pool.query(`SELECT id, networkStatus AS x, COUNT(*) AS y
             FROM sentinel_agents 
             GROUP BY networkStatus`,
        function (err: any, result: any) {
          if (err) {
            return res.json({
              status: 400,
              success: false,
              data: err,
            });
          }
          const labels: any[] = [];
          const series: any[] = [];

          result.forEach((item: any) => {
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
        },
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const securedDevicesbyRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await new Promise((resolve, rejects) => {
      pool.query(
        `SELECT id, machineType AS x, COUNT(*) AS y
             FROM sentinel_agents
             GROUP BY machineType`,
        function (err: any, result: any) {
          if (err) {
            return res.json({
              status: 400,
              success: false,
              data: err,
            });
          }
          const labels: any[] = [];
          const series: any[] = [];

          result.forEach((item: any) => {
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
        },
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const unresolvedThreat = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await new Promise((resolve, rejects) => {
      pool.query(
        `SELECT id, mitigationStatus AS x, COUNT(*) AS y
             FROM sentinel_threat_threatinfo 
             WHERE createdAt >= CURDATE() - INTERVAL 30 DAY
             GROUP BY mitigationStatus`,
        function (err: any, result: any) {
          if (err) {
            return res.json({
              status: 400,
              success: false,
              data: err,
            });
          }
          const labels: any[] = [];
          const series: any[] = [];

          result.forEach((item: any) => {
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
        },
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const blogFeed = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await new Promise((resolve, rejects) => {
      pool.query(
        `SELECT * FROM blogs ORDER BY id DESC LIMIT 1`,
        function (err: any, result: any) {
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
        },
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const threatAging = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await new Promise((resolve, rejects) => {
      pool.query(
        `SELECT id, createdAt AS x, COUNT(*) AS y
             FROM sentinel_threat_threatinfo 
             GROUP BY createdAt`,
        function (err: any, result: any) {
          if (err) {
            return res.json({
              status: 400,
              success: false,
              data: err,
            });
          }
          const labels: any[] = [];
          const series: any[] = [];

          result.forEach((item: any) => {
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
        },
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const threatsByDetection = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await new Promise((resolve, rejects) => {
      pool.query(
        `SELECT id, initiatedBy AS x, COUNT(*) AS y
             FROM sentinel_threat_threatinfo 
             GROUP BY initiatedBy`,
        function (err: any, result: any) {
          if (err) {
            return res.json({
              status: 400,
              success: false,
              data: err,
            });
          }
          const labels: any[] = [];
          const series: any[] = [];

          result.forEach((item: any) => {
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
        },
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const securedDeviceByOs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await new Promise((resolve, rejects) => {
      pool.query(
        `SELECT id,osType AS x, COUNT(*) AS y
          FROM  sentinel_agents
          GROUP BY osType`,
        function (err: any, result: any) {
          if (err) {
            return res.json({
              status: 400,
              success: false,
              data: err,
            });
          }
          const labels: any[] = [];
          const series: any[] = [];

          result.forEach((item: any) => {
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
        },
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const infectedEndpoint = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await new Promise((resolve, rejects) => {
      pool.query(
        `SELECT
          id,
          infected AS x,
          COUNT(*) AS y,
          CASE
            WHEN infected = 0 THEN 'healthy'
            WHEN infected = 1 THEN 'infected'
          END AS status
        FROM sentinel_agents
        GROUP BY infected;`,
        function (err: any, result: any) {
          console.log(result, 'result');

          if (err) {
            return res.json({
              status: 400,
              success: false,
              data: err,
            });
          }
          const labels: any[] = [];
          const series: any[] = [];

          result.forEach((item: any) => {
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
        },
      );
    });
  } catch (error) {
    console.log(error);
  }
};
