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
exports.updateRoleTenant = exports.updateTenantProfile = exports.tenantsGetAll = exports.tenantGetById = exports.createTenant = exports.accreateTenant = void 0;
const db_1 = require("../config/db");
const bcrypt_1 = require("bcrypt");
const sendEmail_1 = require("../helpers/sendEmail");
const accreateTenant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, description, license, first_name, last_name, email, role, } = req.body;
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
                const check = yield db_1.pool
                    .promise()
                    .query('DELETE FROM license_tenant_mapping WHERE tenant_id = ?', [
                    tenantId,
                ]);
            }
            const data = yield db_1.pool
                .promise()
                .query(`update tenant set name=?,description=? where id=?`, [
                data1.name,
                data1.description,
                tenantId,
            ]);
            if (data1.license) {
                for (let i = 0; i < license.length; i++) {
                    // [1,2,3]
                    yield db_1.pool
                        .promise()
                        .query(`insert into license_tenant_mapping (license_id,tenant_id,created_by)value(?,?,?)`, [license[i], tenantId, tenantId]);
                }
            }
            return res.json({
                status: 200,
                success: true,
                message: 'Data updated successfully',
            });
        }
        else {
            const autoGenerate = Math.floor(Math.random() * 10000).toString();
            const check = db_1.pool.query(`insert into tenant (name,description)value(?,?)`, [name, description], function (err, result) {
                if (err) {
                    console.log(err);
                }
                if (result) {
                    var tenantLastId = result === null || result === void 0 ? void 0 : result.insertId;
                    for (let i = 0; i < license.length; i++) {
                        db_1.pool.query(`insert into license_tenant_mapping (license_id,tenant_id,created_by)value(?,?,?)`, [license[i], tenantLastId, tenantLastId], function (err1, result1) {
                            if (err1) {
                                console.log(err1);
                            }
                            const check = db_1.pool.query(`select * from user where email_id=?`, [data1.email], function (err2, result2) {
                                if (result2.length > 0) {
                                    const data2 = db_1.pool.query(`select * from user where email_id=?`, [data1.email], function (err0, result0) {
                                        const userId = result0[0].id;
                                        db_1.pool.query(`insert into user_tenant_mapping (user_id,tenant_id,role)value(?,?,?)`, [userId, tenantLastId, role], function (err00, result00) {
                                            if (err00) {
                                                console.log(err00);
                                            }
                                        });
                                    });
                                }
                                else {
                                    console.log(autoGenerate, "autoGenerate");
                                    const salt = (0, bcrypt_1.genSaltSync)(12);
                                    const decryptPassword = (0, bcrypt_1.hashSync)(autoGenerate, salt);
                                    (0, sendEmail_1.sendEmailFortenant)(first_name, email, autoGenerate);
                                    //  console.log(sendEmailFortenant,"<<<sendEmailFortenan")
                                    db_1.pool.query(`insert into user (first_name,last_name,email_id,password,tenants,created_by,is_forced_change_pwd,role)value(?,?,?,?,?,?,?,?)`, [
                                        first_name,
                                        last_name,
                                        email,
                                        decryptPassword,
                                        tenantLastId,
                                        first_name,
                                        isForceChangePwd,
                                        role,
                                    ], function (err3, result3) {
                                        if (err3) {
                                            console.log();
                                        }
                                        console.log(result3, 'result3');
                                        const user_id = result3.insertId;
                                        db_1.pool.query(`insert into user_tenant_mapping (user_id,tenant_id,role)value(?,?,?)`, [user_id, tenantLastId, role], function (err4, result4) {
                                            if (err4) {
                                                console.log(err4);
                                            }
                                        });
                                    });
                                }
                            });
                        });
                    }
                }
                res.json({
                    status: 200,
                    success: true,
                    message: 'Data inserted successfully',
                    auto: autoGenerate
                });
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.accreateTenant = accreateTenant;
const createTenant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, description, license, first_name, last_name, email, role, } = req.body;
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
                const check = yield db_1.pool
                    .promise()
                    .query('DELETE FROM license_tenant_mapping WHERE tenant_id = ?', [
                    tenantId,
                ]);
            }
            const dataa = yield db_1.pool
                .promise()
                .query(`update tenant set name=?,description=? where id=?`, [
                data1.name,
                data1.description,
                tenantId,
            ]);
            for (let i = 0; i < license.length; i++) {
                yield db_1.pool
                    .promise()
                    .query(`insert into license_tenant_mapping (license_id,tenant_id,created_by) value(?,?,?)`, [license[i], tenantId, tenantId]);
            }
            if (data1.email) {
                const [check1] = yield db_1.pool
                    .promise()
                    .query('SELECT * FROM user WHERE email_id = ?', [data1.email]);
                if (check1.length == 0) {
                    const [userResult] = yield db_1.pool
                        .promise()
                        .query(`insert into user (first_name,last_name,email_id,password,tenants,created_by) value(?,?,?,?,?,?)`, [
                        first_name,
                        last_name,
                        email,
                        null,
                        tenantId,
                        first_name,
                    ]);
                    const userId = userResult.insertId;
                    const [mappingResult] = yield db_1.pool
                        .promise()
                        .query(`insert into user_tenant_mapping (user_id,tenant_id,role) value(?,?,?)`, [userId, tenantId, role]);
                }
            }
            return res.json({
                status: 200,
                success: true,
            });
        }
        else {
            const [tenantResult] = yield db_1.pool
                .promise()
                .query(`insert into tenant (name,description) value(?,?)`, [
                name,
                description,
            ]);
            const tenantLastId = tenantResult.insertId;
            for (let i = 0; i < license.length; i++) {
                yield db_1.pool
                    .promise()
                    .query(`insert into license_tenant_mapping (license_id,tenant_id,created_by) value(?,?,?)`, [license[i], tenantLastId, tenantLastId]);
            }
            if (email) {
                const [check1] = yield db_1.pool
                    .promise()
                    .query('SELECT * FROM user WHERE email_id = ?', [email]);
                if (check1.length > 0) {
                    const userId = check1[0].id;
                    yield db_1.pool
                        .promise()
                        .query(`insert into user_tenant_mapping (user_id,tenant_id,role) value(?,?,?)`, [userId, tenantLastId, role]);
                }
                else {
                    const autoGenerate = Math.floor(Math.random() * 10000).toString();
                    const salt = (0, bcrypt_1.genSaltSync)(12);
                    const decryptPassword = (0, bcrypt_1.hashSync)(autoGenerate, salt);
                    (0, sendEmail_1.sendEmailFortenant)(first_name, email, autoGenerate);
                    const [userResult] = yield db_1.pool
                        .promise()
                        .query(`insert into user (first_name,last_name,email_id,password,tenants,created_by) value(?,?,?,?,?,?)`, [
                        first_name,
                        last_name,
                        email,
                        decryptPassword,
                        tenantLastId,
                        first_name,
                    ]);
                    const userId = userResult.insertId;
                    yield db_1.pool
                        .promise()
                        .query(`insert into user_tenant_mapping (user_id,tenant_id,role) value(?,?,?)`, [userId, tenantLastId, role]);
                }
            }
            res.json({
                status: 200,
                success: true,
                message: 'inserted successfully',
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.createTenant = createTenant;
const tenantGetById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const data1 = yield new Promise((resolve, reject) => {
            db_1.pool.query(`Select * from tenant where id='${queryId}'`, function (err, result) {
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
            });
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.tenantGetById = tenantGetById;
const tenantsGetAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = db_1.pool.query(`SELECT * FROM tenant`, function (err, result) {
            if (err) {
                console.log(err);
            }
            if (result) {
                const tenants = result;
                const tenantIds = tenants.map((tenant) => tenant.id);
                db_1.pool.query(`SELECT

            t.id AS tenant_id,

            t.name AS tenant_name,

            t.description AS tenant_description,

            t.status,

            lt.id AS license_id,

            lt.license_name

          FROM

            tenant AS t

            JOIN license_tenant_mapping AS ltm ON ltm.tenant_id = t.id

            JOIN license AS lt ON lt.id = ltm.license_id`, function (err1, result1) {
                    if (err1) {
                        console.log(err1);
                    }
                    if (result1) {
                        console.log(result1, 'RESULT');
                        const licensesByTenant = tenantIds.map((tenantId) => {
                            const licenses = result1.filter((row) => row.tenant_id === tenantId);
                            return {
                                tenant_id: tenantId,
                                tenant_name: tenants.find((tenant) => tenant.id === tenantId).name,
                                tenant_description: tenants.find((tenant) => tenant.id === tenantId).description,
                                status: tenants.find((tenant) => tenant.id === tenantId).status,
                                licenses: licenses.map((license) => ({
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
                });
            }
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.tenantsGetAll = tenantsGetAll;
const updateTenantProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { tenantName, description, license, controlId, firstName, lastName, email, role, } = req.body;
        if (!tenantName) {
            return res.json({
                statusCode: 200,
                status: false,
                message: 'please enter tenant name',
            });
        }
        const data = req.body;
        const update = new Promise((resolve, rejects) => {
            db_1.pool.query(`update tenant set tenant_name=?,description=?,license=?,first_name=?,last_name=?,email=?,role=? where id='${queryId}'`, [
                data.tenantName,
                data.description,
                data.license,
                data.firstName,
                data.lastName,
                data.email,
                data.role,
            ], function (err, result) {
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
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateTenantProfile = updateTenantProfile;
const updateRoleTenant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const data = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`Update tenant Set status=0 where id=${queryId}`, function (err, result) {
                if (err) {
                    console.log(err);
                }
                return res.json({
                    status: 200,
                    success: true,
                    Message: 'your are deactivated',
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateRoleTenant = updateRoleTenant;
