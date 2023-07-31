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
exports.incidents = void 0;
const db_1 = require("../config/db");
// export const accincidents = async (
//     req: Request,
//     res: Response,
//     next: NextFunction,
// ) => {
//     try {
//         console.log("INCIDENTS")
//         const query = pool.query(`SELECT * FROM sentinel_threat_threatinfo as stt LEFT JOIN sentinel_threat_indicators as sti on stt.collectionId = sti.threat_id LEFT JOIN sentinel_threat_agentrealtimeinfo as sta on stt.collectionId = sta.agentId`, function (err: any, result: any) {
//             if (err) {
//                 return res.json({
//                     status: 400,
//                     success: false,
//                     message: "Data Error",
//                 });
//             }
//             if (result) {
//                 return res.json({
//                     status: 200,
//                     success: true,
//                     data: result,
//                 });
//             }
//         })
//     } catch (e) {
//         console.log("err=>", e)
//         return res.json({
//             status: 500,
//             success: false,
//             message: "Internal Server Error",
//         });
//     }
// }
const incidents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("hello")
        const { cat, col, type } = req.body;
        console.log(req.body);
        if (cat === 'threats') {
            if (col === 'detection engine') {
                const query = db_1.pool.query(`SELECT * FROM sentinel_threat_threatinfo AS stt
                LEFT JOIN sentinel_threat_indicators AS sti ON stt.collectionId = sti.threat_id   
                LEFT JOIN sentinel_threat_agentrealtimeinfo AS sta ON stt.collectionId = sta.agentId
                WHERE stt.detectionEngines_title=?`, [type], function (err, result) {
                    console.log(result);
                    if (result) {
                        return res.json({
                            status: 200,
                            success: true,
                            data: result,
                        });
                    }
                });
            }
            else if (col === 'threat type') {
                const query = db_1.pool.query(`SELECT * FROM sentinel_threat_threatinfo AS stt 
    LEFT JOIN sentinel_threat_indicators AS sti ON stt.collectionId = sti.threat_id 
    LEFT JOIN sentinel_threat_agentrealtimeinfo AS sta ON stt.collectionId = sta.agentId 
    WHERE stt.detectionEngines_title = ${type}`, function (err, result) {
                    if (result) {
                        return res.json({
                            status: 200,
                            success: true,
                            data: result,
                        });
                    }
                });
            }
        }
        else if (cat === 'agents') {
            if (col === 'agentVersion') {
                const query = db_1.pool.query(`SELECT * FROM sentinel_agents AS agent 
                LEFT JOIN sentinel_agent_activedirectory AS aav ON agent.agentId = aav.agentId 
                LEFT JOIN sentinel_agent_networkinterfaces AS san ON agent.agentId = san.agentId
                WHERE agent.agentVersion=?`, [type], function (err, result) {
                    console.log(result);
                    if (result) {
                        return res.json({
                            status: 200,
                            success: true,
                            data: result,
                        });
                    }
                });
            }
        }
        // 
        else {
            const query = db_1.pool.query(`SELECT * FROM sentinel_threat_threatinfo AS stt 
      LEFT JOIN sentinel_threat_indicators AS sti ON stt.collectionId = sti.threat_id 
      LEFT JOIN sentinel_threat_agentrealtimeinfo AS sta ON stt.collectionId = sta.agentId`, function (err, result) {
                if (result) {
                    return res.json({
                        status: 200,
                        success: true,
                        data: result,
                    });
                }
            });
        }
        //<<<<<<<<<<<<<<<<<<<<<<threats>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        // if (cat === 'agents') {
        //     if (col === 'agentVersion') {
        //         const query = pool.query(`SELECT * FROM sentinel_agents AS agent 
        //         LEFT JOIN sentinel_agent_activedirectory AS aav ON agent.agentId = aav.agentId 
        //         LEFT JOIN sentinel_agent_networkinterfaces AS san ON agent.agentId = san.agentId
        //         WHERE agent.agentVersion=?`, [type], function (err: any, result: any) {
        //     console.log(result)    
        //     if (result) {
        //                 return res.json({
        //                     status: 200,
        //                     success: true,
        //                     data: result,
        //                 });
        //             }
        //         })
        //     }
        //     else if (col === 'threat type') {
        //         const query = pool.query(`SELECT * FROM sentinel_threat_threatinfo AS stt 
        // LEFT JOIN sentinel_threat_indicators AS sti ON stt.collectionId = sti.threat_id 
        // LEFT JOIN sentinel_threat_agentrealtimeinfo AS sta ON stt.collectionId = sta.agentId 
        // WHERE stt.detectionEngines_title = ${type}`, function (err: any, result: any) {
        //             if (result) {
        //                 return res.json({
        //                     status: 200,
        //                     success: true,
        //                     data: result,
        //                 });
        //             }
        //         })
        //     }
        // } else {
        //     const query = pool.query(`SELECT * FROM sentinel_threat_threatinfo AS stt 
        // LEFT JOIN sentinel_threat_indicators AS sti ON stt.collectionId = sti.threat_id 
        // LEFT JOIN sentinel_threat_agentrealtimeinfo AS sta ON stt.collectionId = sta.agentId`, function (err: any, result: any) {
        //         if (result) {
        //             return res.json({
        //                 status: 200,
        //                 success: true,
        //                 data: result,
        //             });
        //         }
        //     })
        // }
        // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<end
        //     if (cat === 'threats') {
        //         if (col === 'detection engine') {
        //             const query = pool.query(`SELECT * FROM sentinel_threat_threatinfo AS stt 
        //   LEFT JOIN sentinel_threat_indicators AS sti ON sti.agent_id = agent_id 
        //   LEFT JOIN sentinel_threat_agentrealtimeinfo AS sta ON stt.collectionId = sta.agentId 
        //   WHERE stt.detectionEngines_title = ${type}`, function (err: any, result: any) {
        //                 if (result) {
        //                     return res.json({
        //                         status: 200,
        //                         success: true,
        //                         data: result,
        //                     });
        //                 }
        //             })
        //         }
        //     }
        // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        // const query = pool.query(
        //     `SELECT * FROM sentinel_threat_threatinfo AS stt 
        //   LEFT JOIN sentinel_threat_indicators AS sti ON stt.collectionId = sti.threat_id 
        //   LEFT JOIN sentinel_threat_agentrealtimeinfo AS sta ON stt.collectionId = sta.agentId 
        //   WHERE stt.detectionEngines_title = ${type}`,
        //     function (err: any, result: any) {
        //         if (result) {
        //             return res.json({
        //                 status: 200,
        //                 success: true,
        //                 data: result,
        //             });
        //         }
        //         // Handle the query result or error here
        //         if (err) {
        //             return res.json({
        //                 status: 400,
        //                 success: false,
        //                 message: "Data Error",
        //             });
        //         }
        //     }
        // );
        // } else if (cat === 'agent') {
        //     const query = pool.query(
        //         `SELECT * FROM sentinel_agent AS agent 
        //       LEFT JOIN sentinel_agent_activedirectory AS aav ON agent.agentId = aav.agentId 
        //       LEFT JOIN sentinel_agent_networkinterfaces AS san ON agent.agentId = san.agentId`,
        //         function (err: any, result: any) {
        //             if (result) {
        //                 return res.json({
        //                     status: 200,
        //                     success: true,
        //                     data: result,
        //                 });
        //             }
        //             // Handle the query result or error here
        //             if (err) {
        //                 return res.json({
        //                     status: 400,
        //                     success: false,
        //                     message: "Data Error",
        //                 });
        //             }
        //         }
        //     );
        // } else if (cat === 'alldata') {
        //     const query = pool.query(
        //         `SELECT * FROM sentinel_threat_threatinfo AS stt 
        //       LEFT JOIN sentinel_threat_indicators AS sti ON stt.collectionId = sti.threat_id 
        //       LEFT JOIN sentinel_threat_agentrealtimeinfo AS sta ON stt.collectionId = sta.agentId`,
        //         function (err: any, result: any) {
        //             if (result) {
        //                 return res.json({
        //                     status: 200,
        //                     success: true,
        //                     data: result,
        //                 });
        //             }
        //             // Handle the query result or error here
        //             if (err) {
        //                 return res.json({
        //                     status: 400,
        //                     success: false,
        //                     message: "Data Error",
        //                 });
        //             }
        //         }
        //     );
        // }
    }
    catch (e) {
        console.log("err=>", e);
        return res.json({
            status: 500,
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.incidents = incidents;
