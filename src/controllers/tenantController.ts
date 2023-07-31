import { Request, Response, NextFunction } from 'express';
import { pool } from '../config/db';
import bcrypt from 'bcrypt';
import { genSaltSync, hashSync } from 'bcrypt';
import { sendEmailFortenant } from '../helpers/sendEmail';
import jwtHelper from '../helpers/jwt.helper';
import { request } from 'http';
import { resolve } from 'node:path/win32';
import { rejects } from 'assert';

export const accreateTenant = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      id,
      name,
      description,
      license,
      first_name,
      last_name,
      email,
      role,
    } = req.body;
    const data1 = {
      id,
      name,
      description,
      license,
      first_name,
      last_name,
      email,
      role,
    };
    const isForceChangePwd = 1;
    if (!name) {
      return res.json({
        status: 200,
        success: false,
        message: 'Please enter tenant Name',
      });
    }
    var tenantId = id;
    if (id > 0) {
      if (tenantId) {
        const check = await pool
          .promise()
          .query('DELETE FROM license_tenant_mapping WHERE tenant_id = ?', [
            tenantId,
          ]);
      }
      const data = await pool
        .promise()
        .query(`update tenant set name=?,description=? where id=?`, [
          data1.name,
          data1.description,
          tenantId,
        ]);
      if (data1.license) {
        for (let i = 0; i < license.length; i++) {
          // [1,2,3]
          await pool
            .promise()
            .query(
              `insert into license_tenant_mapping (license_id,tenant_id,created_by)value(?,?,?)`,
              [license[i], tenantId, tenantId],
            );
        }
      }

      return res.json({
        status: 200,
        success: true,
        message: 'Data updated successfully',
      });
    } else {
      const autoGenerate = Math.floor(
        Math.random() * 10000,
      ).toString();
      const check = pool.query(
        `insert into tenant (name,description)value(?,?)`,
        [name, description],
        function (err: any, result: any) {
          if (err) {
            console.log(err);
          }
          if (result) {
            var tenantLastId = result?.insertId;
            for (let i = 0; i < license.length; i++) {
              pool.query(
                `insert into license_tenant_mapping (license_id,tenant_id,created_by)value(?,?,?)`,
                [license[i], tenantLastId, tenantLastId],
                function (err1: any, result1: any) {
                  if (err1) {
                    console.log(err1);
                  }
                  const check = pool.query(
                    `select * from user where email_id=?`,
                    [data1.email],
                    function (err2: any, result2: any) {
                      if (result2.length > 0) {
                        const data2 = pool.query(
                          `select * from user where email_id=?`,
                          [data1.email],
                          function (err0: any, result0: any) {
                            const userId = result0[0].id;
                            pool.query(
                              `insert into user_tenant_mapping (user_id,tenant_id,role)value(?,?,?)`,
                              [userId, tenantLastId, role],
                              function (err00: any, result00: any) {
                                if (err00) {
                                  console.log(err00);
                                }
                              },
                            );
                          },
                        );
                      } else {
                        
                        console.log(autoGenerate,"autoGenerate");
                        
                        const salt = genSaltSync(12);
                        const decryptPassword = hashSync(autoGenerate, salt);
                        sendEmailFortenant(first_name, email, autoGenerate);
                        //  console.log(sendEmailFortenant,"<<<sendEmailFortenan")
                        pool.query(
                          `insert into user (first_name,last_name,email_id,password,tenants,created_by,is_forced_change_pwd,role)value(?,?,?,?,?,?,?,?)`,
                          [
                            first_name,
                            last_name,
                            email,
                            decryptPassword,
                            tenantLastId,
                            first_name,
                            isForceChangePwd,
                            role,
                          ],
                          function (err3: any, result3: any) {
                            if (err3) {
                              console.log();
                            }
                            console.log(result3, 'result3');

                            const user_id = result3.insertId;
                            pool.query(
                              `insert into user_tenant_mapping (user_id,tenant_id,role)value(?,?,?)`,
                              [user_id, tenantLastId, role],
                              function (err4: any, result4: any) {
                                if (err4) {
                                  console.log(err4);
                                }
                              },
                            );
                          },
                        );
                      }
                    },
                  );
                },
              );
            }
          }
          res.json({
            status: 200,
            success: true,
            message: 'Data inserted successfully',
            auto: autoGenerate
          });
        },
      );
    }
  } catch (error) {
    console.log(error);
  }
};
export const createTenant = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      id,
      name,
      description,
      license,
      first_name,
      last_name,
      email,
      role,
    } = req.body;
    const data1 = {
      id,
      name,
      description,
      license,
      first_name,
      last_name,
      email,
      role,
    };

    if (!name) {
      return res.json({
        status: 200,
        success: false,
        message: 'Please enter tenantName',
      });
    }

    var tenantId = id;

    if (id > 0) {
      if (tenantId) {
        const check = await pool
          .promise()
          .query('DELETE FROM license_tenant_mapping WHERE tenant_id = ?', [
            tenantId,
          ]);
      }

      const dataa = await pool
        .promise()
        .query(`update tenant set name=?,description=? where id=?`, [
          data1.name,
          data1.description,
          tenantId,
        ]);

      for (let i = 0; i < license.length; i++) {
        await pool
          .promise()
          .query(
            `insert into license_tenant_mapping (license_id,tenant_id,created_by) value(?,?,?)`,
            [license[i], tenantId, tenantId],
          );
      }

      if (data1.email) {
        const [check1] = await pool
          .promise()
          .query('SELECT * FROM user WHERE email_id = ?', [data1.email]);

        if (check1.length == 0) {
          const [userResult] = await pool
            .promise()
            .query(
              `insert into user (first_name,last_name,email_id,password,tenants,created_by) value(?,?,?,?,?,?)`,
              [
                first_name,
                last_name,
                email,
                null,
                tenantId,
                first_name,
              ],
            );

          const userId = userResult.insertId;

          const [mappingResult] = await pool
            .promise()
            .query(
              `insert into user_tenant_mapping (user_id,tenant_id,role) value(?,?,?)`,
              [userId, tenantId, role],
            );
        }
      }

      return res.json({
        status: 200,
        success: true,
      });
    } else {
      const [tenantResult] = await pool
        .promise()
        .query(`insert into tenant (name,description) value(?,?)`, [
          name,
          description,
        ]);

      const tenantLastId = tenantResult.insertId;

      for (let i = 0; i < license.length; i++) {
        await pool
          .promise()
          .query(
            `insert into license_tenant_mapping (license_id,tenant_id,created_by) value(?,?,?)`,
            [license[i], tenantLastId, tenantLastId],
          );
      }

      if (email) {
        const [check1] = await pool
          .promise()
          .query('SELECT * FROM user WHERE email_id = ?', [email]);

        if (check1.length > 0) {
          const userId = check1[0].id;

          await pool
            .promise()
            .query(
              `insert into user_tenant_mapping (user_id,tenant_id,role) value(?,?,?)`,
              [userId, tenantLastId, role],
            );
        } else {
          const autoGenerate = Math.floor(
            Math.random() * 10000,
          ).toString();
          const salt = genSaltSync(12);
          const decryptPassword = hashSync(autoGenerate, salt);
          sendEmailFortenant(first_name, email, autoGenerate);

          const [userResult] = await pool
            .promise()
            .query(
              `insert into user (first_name,last_name,email_id,password,tenants,created_by) value(?,?,?,?,?,?)`,
              [
                first_name,
                last_name,
                email,
                decryptPassword,
                tenantLastId,
                first_name,
              ],
            );

          const userId = userResult.insertId;

          await pool
            .promise()
            .query(
              `insert into user_tenant_mapping (user_id,tenant_id,role) value(?,?,?)`,
              [userId, tenantLastId, role],
            );
        }
      }

      res.json({
        status: 200,
        success: true,
        message: 'inserted successfully',
      });
    }
  } catch (error) {
    console.log(error);
  }
};


export const tenantGetById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.body.sessionUserData.id;
    if (!id) {
      return res.json({
        status: 400,
        success: false,
        message: 'please login again',
      });
    }
    const queryId = req.query.id;
    // console.log(queryId,"queryId");
    const data1 = await new Promise((resolve, reject) => {
      pool.query(
        `Select * from tenant where id='${queryId}'`,
        function (err: any, result: any) {
          if (err) {
            return res.json({
              status: 400,
              success: false,
              message: err,
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
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const tenantsGetAll = async (
  req: Request,

  res: Response,

  next: NextFunction,
) => {
  try {
    const check = pool.query(
      `SELECT * FROM tenant`,

      function (err: any, result: any) {
        if (err) {
          console.log(err);
        }

        if (result) {
          const tenants = result;

          const tenantIds = tenants.map((tenant: any) => tenant.id);

          pool.query(
            `SELECT

            t.id AS tenant_id,

            t.name AS tenant_name,

            t.description AS tenant_description,

            t.status,

            lt.id AS license_id,

            lt.license_name

          FROM

            tenant AS t

            JOIN license_tenant_mapping AS ltm ON ltm.tenant_id = t.id

            JOIN license AS lt ON lt.id = ltm.license_id`,

            function (err1: any, result1: any) {
              if (err1) {
                console.log(err1);
              }

              if (result1) {
                console.log(result1, 'RESULT');

                const licensesByTenant = tenantIds.map((tenantId: number) => {
                  const licenses = result1.filter(
                    (row: any) => row.tenant_id === tenantId,
                  );

                  return {
                    tenant_id: tenantId,

                    tenant_name: tenants.find(
                      (tenant: any) => tenant.id === tenantId,
                    ).name,

                    tenant_description: tenants.find(
                      (tenant: any) => tenant.id === tenantId,
                    ).description,

                    status: tenants.find(
                      (tenant: any) => tenant.id === tenantId,
                    ).status,

                    licenses: licenses.map((license: any) => ({
                      license_id: license.license_id,

                      license_name: license.license_name,
                    })),
                  };
                });

                res.json({
                  success: true,

                  status: 200,

                  data: licensesByTenant,
                });
              }
            },
          );
        }
      },
    );
  } catch (err) {
    console.log(err);

    next(err);
  }
};

export const updateTenantProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.body.sessionUserData.id;
    const queryId = req.query.id;
    if (!id) {
      return res.json({
        status: 400,
        success: true,
        message: 'please login again',
      });
    }

    const {
      tenantName,
      description,
      license,
      controlId,
      firstName,
      lastName,
      email,
      role,
    } = req.body;
    if (!tenantName) {
      return res.json({
        statusCode: 200,
        status: false,
        message: 'please enter tenant name',
      });
    }
    const data = req.body;
    const update = new Promise((resolve, rejects) => {
      pool.query(
        `update tenant set tenant_name=?,description=?,license=?,first_name=?,last_name=?,email=?,role=? where id='${queryId}'`,
        [
          data.tenantName,
          data.description,
          data.license,
          data.firstName,
          data.lastName,
          data.email,
          data.role,
        ],
        function (err: any, result: any) {
          if (err) {
            return res.json({
              status: 400,
              success: false,
              message: err,
            });
          }
          return res.json({
            status: 200,
            success: true,
            message: 'Update tenant successfully',
          });
        },
      );
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateRoleTenant = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const queryId = req.query.id;
    const id = req.body.sessionUserData.id;
    if (!id) {
      return res.json({
        status: 400,
        success: true,
        message: 'please login again',
      });
    }
    const data = await new Promise((resolve, rejects) => {
      pool.query(
        `Update tenant Set status=0 where id=${queryId}`,
        function (err: any, result: any) {
          if (err) {
            console.log(err);
          }
          return res.json({
            status: 200,
            success: true,
            Message: 'your are deactivated',
          });
        },
      );
    });
  } catch (error) {
    console.log(error);
  }
};
