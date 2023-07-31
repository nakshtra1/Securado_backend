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
exports.securedDeviceDomainThreat = exports.securedDeviceThreat = exports.incidentStatusDesThreat = exports.severityLevelThreat = exports.analystVerdictDescription = exports.getpichat = exports.getControls = void 0;
const db_1 = require("../config/db");
const getControls = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.body);
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT * FROM license`, function (err, result) {
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
exports.getControls = getControls;
const getpichat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT id,category AS x,COUNT(*) AS y FROM threat_indicators GROUP BY category`, function (err, result) {
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
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getpichat = getpichat;
const analystVerdictDescription = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.body);
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT id, analystVerdictDescription AS x, COUNT(*) AS y
             FROM threat_threatinfo 
             GROUP BY analystVerdictDescription`, function (err, result) {
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
exports.analystVerdictDescription = analystVerdictDescription;
const severityLevelThreat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.body);
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT id, confidenceLevel AS x, COUNT(*) AS y
             FROM threat_threatinfo 
             GROUP BY confidenceLevel`, function (err, result) {
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
exports.severityLevelThreat = severityLevelThreat;
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
const incidentStatusDesThreat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT id, incidentStatus AS x, COUNT(*) AS y
             FROM threat_threatinfo 
             GROUP BY incidentStatus`, function (err, result) {
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
exports.incidentStatusDesThreat = incidentStatusDesThreat;
const securedDeviceThreat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT id, incidentStatus AS x, COUNT(*) AS y
             FROM threat_threatinfo 
             GROUP BY incidentStatus`, function (err, result) {
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
exports.securedDeviceThreat = securedDeviceThreat;
const securedDeviceDomainThreat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`SELECT id, incidentStatus AS x, COUNT(*) AS y
             FROM threat_threatinfo 
             GROUP BY incidentStatus`, function (err, result) {
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
exports.securedDeviceDomainThreat = securedDeviceDomainThreat;
