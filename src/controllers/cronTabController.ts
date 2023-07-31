import { NextFunction, Response, Request } from 'express';
import { pool } from '../config/db';

export const cronTableGetAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = pool.query(
      `select id,name,cron_function,time,isActive from crontab_config`,
      function (err: any, result: any) {
        if (err) {
          console.log(err);
        }
        if (result.length > 0) {
          res.json({
            status: 200,
            succes: true,
            message: result,
          });
        } else {
          res.json({
            status: 200,
            succes: true,
            message: 'No data found',
          });
        }
      },
    );
  } catch (error) {
    console.log(error);
  }
};

export const cronTableUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    pool.query(
      'SELECT * FROM crontab_config',
      function (err: any, result: any) {
        if (err) {
          console.log(err);
        }

        if (result) {
          data.map((elem: any) => {
            const matchingResult = result.map((r: any) => r.id === elem.id);
            if (
              matchingResult &&
              (matchingResult.time !== elem.time ||
                matchingResult.isActive !== elem.isActive)
            ) {
              pool.query(
                'UPDATE crontab_config SET time = ?, isActive = ? WHERE id = ?',
                [elem.time, elem.isActive, elem.id],
                function (err1: any, result1: any) {
                  if (err1) {
                    console.log(err1);
                  }
                },
              );
            }
          });

          res.status(200).json({
            success: true,
            message: 'Updated successfully',
          });
        }
      },
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

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
