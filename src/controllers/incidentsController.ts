import { Request, Response, NextFunction } from 'express';
import { pool } from '../config/db';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { DateTime } from 'luxon';
import { json } from 'stream/consumers';

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


export const incidents = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // console.log("hello")
        const { cat, col, type } = req.body;
        console.log(req.body)
        if (cat === 'threats') {
            if (col === 'detection engine') {
                const query = pool.query(`SELECT * FROM sentinel_threat_threatinfo AS stt
                LEFT JOIN sentinel_threat_indicators AS sti ON stt.collectionId = sti.threat_id   
                LEFT JOIN sentinel_threat_agentrealtimeinfo AS sta ON stt.collectionId = sta.agentId
                WHERE stt.detectionEngines_title=?`, [type], function (err: any, result: any) {
            console.log(result)    
            if (result) {
                        return res.json({
                            status: 200,
                            success: true,
                            data: result,
                        });
                    }
                })

            }
            else if (col === 'threat type') {
                const query = pool.query(`SELECT * FROM sentinel_threat_threatinfo AS stt 
    LEFT JOIN sentinel_threat_indicators AS sti ON stt.collectionId = sti.threat_id 
    LEFT JOIN sentinel_threat_agentrealtimeinfo AS sta ON stt.collectionId = sta.agentId 
    WHERE stt.detectionEngines_title = ${type}`, function (err: any, result: any) {
                    if (result) {
                        return res.json({
                            status: 200,
                            success: true,
                            data: result,
                        });
                    }
                })

            }

        }
        else if (cat === 'agents') {
            if (col === 'agentVersion') {
                const query = pool.query(`SELECT * FROM sentinel_agents AS agent 
                LEFT JOIN sentinel_agent_activedirectory AS aav ON agent.agentId = aav.agentId 
                LEFT JOIN sentinel_agent_networkinterfaces AS san ON agent.agentId = san.agentId
                WHERE agent.agentVersion=?`, [type], function (err: any, result: any) {
            console.log(result)    
            if (result) {
                        return res.json({
                            status: 200,
                            success: true,
                            data: result,
                        });
                    }
                })
        
            }

        }
        // 
        else {
            const query = pool.query(`SELECT * FROM sentinel_threat_threatinfo AS stt 
      LEFT JOIN sentinel_threat_indicators AS sti ON stt.collectionId = sti.threat_id 
      LEFT JOIN sentinel_threat_agentrealtimeinfo AS sta ON stt.collectionId = sta.agentId`, function (err: any, result: any) {
                if (result) {
                    return res.json({
                        status: 200,
                        success: true,
                        data: result,
                    });
                }
            })
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
    } catch (e) {
        console.log("err=>", e);
        return res.json({
            status: 500,
            success: false,
            message: "Internal Server Error",
        });
    }
}


