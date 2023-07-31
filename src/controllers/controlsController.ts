import { Request, Response, NextFunction } from 'express';
import { pool } from '../config/db';
import { resolve } from 'path';
import { rejects } from 'assert';

export const getControls = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // console.log(req.body);
    const check = await new Promise((resolve, rejects) => {
      pool.query(`SELECT * FROM license`, function (err: any, result: any) {
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
  } catch (error) {
    console.log(error);
  }
};

export const getpichat = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await new Promise((resolve, rejects) => {
      pool.query(
        `SELECT id,category AS x,COUNT(*) AS y FROM threat_indicators GROUP BY category`,
        function (err: any, result: any) {
          if (err) {
            return res.json({
              status: 400,
              success: false,
              data: err,
            });
          }
          //    for(let i=0; i<result.length; i++){
          //      console.log(result[i].category,"<=========count")
          //      console.log(result[i].count,"<=========count")
          //    }
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
             FROM threat_threatinfo 
             GROUP BY analystVerdictDescription`,
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

export const severityLevelThreat = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // console.log(req.body);
    const check = await new Promise((resolve, rejects) => {
      pool.query(
        `SELECT id, confidenceLevel AS x, COUNT(*) AS y
             FROM threat_threatinfo 
             GROUP BY confidenceLevel`,
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

//  export const incidentStatusDesThreat= async(req:Request,res:Response,next:NextFunction)=>{
//      try {

//          const check = await new Promise((resolve,rejects)=>{
//              pool.query(`SELECT id, incidentStatus AS x, COUNT(*) AS y
//              FROM threat_threatinfo
//              GROUP BY incidentStatus`,function(err:any,result:any){
//                   if(err){
//                      return res.json({
//                           status:400,
//                           success:false,
//                           data:err
//                      })
//                   }
//                   return res.json({
//                        status:200,
//                        success:true,
//                        data:result
//                   })
//              })
//         })

//      } catch (error) {
//          console.log(error);

//      }
//  }

export const incidentStatusDesThreat = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await new Promise((resolve, rejects) => {
      pool.query(
        `SELECT id, incidentStatus AS x, COUNT(*) AS y
             FROM threat_threatinfo 
             GROUP BY incidentStatus`,
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

export const securedDeviceThreat = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await new Promise((resolve, rejects) => {
      pool.query(
        `SELECT id, incidentStatus AS x, COUNT(*) AS y
             FROM threat_threatinfo 
             GROUP BY incidentStatus`,
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

export const securedDeviceDomainThreat = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await new Promise((resolve, rejects) => {
      pool.query(
        `SELECT id, incidentStatus AS x, COUNT(*) AS y
             FROM threat_threatinfo 
             GROUP BY incidentStatus`,
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
