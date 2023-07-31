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
exports.cronTableUpdate = exports.cronTableGetAll = void 0;
const db_1 = require("../config/db");
const cronTableGetAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = db_1.pool.query(`select id,name,cron_function,time,isActive from crontab_config`, function (err, result) {
            if (err) {
                console.log(err);
            }
            if (result.length > 0) {
                res.json({
                    status: 200,
                    succes: true,
                    message: result,
                });
            }
            else {
                res.json({
                    status: 200,
                    succes: true,
                    message: 'No data found',
                });
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.cronTableGetAll = cronTableGetAll;
const cronTableUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        db_1.pool.query('SELECT * FROM crontab_config', function (err, result) {
            if (err) {
                console.log(err);
            }
            if (result) {
                data.map((elem) => {
                    const matchingResult = result.map((r) => r.id === elem.id);
                    if (matchingResult &&
                        (matchingResult.time !== elem.time ||
                            matchingResult.isActive !== elem.isActive)) {
                        db_1.pool.query('UPDATE crontab_config SET time = ?, isActive = ? WHERE id = ?', [elem.time, elem.isActive, elem.id], function (err1, result1) {
                            if (err1) {
                                console.log(err1);
                            }
                        });
                    }
                });
                res.status(200).json({
                    success: true,
                    message: 'Updated successfully',
                });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.cronTableUpdate = cronTableUpdate;
// export const cronTableUpdate = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const updatedRows = req.body;
//     const updatePromises = updatedRows.map((row: any) => {
//       return new Promise((resolve, reject) => {
//         pool.query(
//           `UPDATE crontab_config SET time = ?, isActive = ? WHERE id = ?`,
//           [row.time, row.isActive, row.id],
//           function (err: any, result: any) {
//             if (err) {
//               reject(err);
//             }
//             resolve(result);
//           },
//         );
//       });
//     });
//     Promise.all(updatePromises)
//       .then(() => {
//         res.json({
//           status: 200,
//           success: true,
//           message: 'Updated successfully',
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//         res.json({
//           status: 500,
//           success: false,
//           message: 'Failed to update',
//         });
//       });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       status: 500,
//       success: false,
//       message: 'Failed to update',
//     });
//   }
// };
