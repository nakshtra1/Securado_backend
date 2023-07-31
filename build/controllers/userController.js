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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.widgetmasterGetMcdAcs = exports.singleWidgetInsert = exports.widgetDelete = exports.getAllWidget = exports.insertwidget = exports.getDefaultValue = exports.forgotPasswordSendOtp = exports.deactiveUser = exports.updateProfile = exports.getAll = exports.getUserById = exports.userLogin = exports.userCreate = exports.getToken = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const bcrypt_2 = require("bcrypt");
const db_1 = require("../config/db");
const jwt_helper_1 = __importDefault(require("../helpers/jwt.helper"));
const getToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.get('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        req.body.isAuth = false;
        return next();
    }
    try {
        const tokenVerify = jwt_helper_1.default.verifyAccessToken(token);
        if (!tokenVerify) {
            req.body.isAuth = false;
            return next();
        }
        req.body.sessionUserData = tokenVerify;
        req.body.isAuth = true;
        return res.json({
            success: true,
            status: 200,
            message: 'Decrypted value retrieved successfully',
            // data: decryptedValue,
            data: tokenVerify,
            token: token
        });
    }
    catch (error) {
        return res.json({
            success: false,
            status: 400,
            message: 'Invalid token',
            data: null,
        });
    }
});
exports.getToken = getToken;
const userCreate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id, firstName, lastName, emailId, tenant, is_auto_generate, is_force_change, password, } = req.body;
        if (!firstName) {
            return res.json({
                status: 200,
                success: false,
                message: 'Please enter first name',
            });
        }
        if (!lastName) {
            return res.json({
                status: 200,
                success: false,
                message: 'Please enter last name',
            });
        }
        if (!emailId) {
            return res.json({
                status: 200,
                success: false,
                message: 'Please enter email id',
            });
        }
        if (!tenant) {
            return res.json({
                status: 200,
                success: false,
                message: 'Please select tenants',
            });
        }
        if (id > 0) {
            console.log(id);
            let data = {
                id,
                firstName,
                lastName,
                emailId,
                tenant,
                is_auto_generate,
                is_force_change,
                password,
            };
            if (id) {
                const check = yield db_1.pool
                    .promise()
                    .query('DELETE FROM user_tenant_mapping WHERE user_id = ?', [id]);
            }
            db_1.pool.query(`update user set first_name=?, last_name=?, email_id=?, tenants=? where id=?`, [
                data.firstName,
                data.lastName,
                data.emailId,
                JSON.stringify(data.tenant.map((t) => t.id)),
                id,
            ], function (err, result) {
                if (err) {
                    console.log(err);
                    return res.json({
                        status: 200,
                        success: false,
                        message: 'Failed to insert user data',
                    });
                }
                if (result) {
                    const userId = id;
                    // console.log(userId, 'userId');
                    if (data.tenant && data.tenant.length > 0) {
                        data.tenant.forEach((tenant) => {
                            db_1.pool.query(`INSERT INTO user_tenant_mapping (user_id, tenant_id, role) VALUES (?, ?, ?)`, [id, tenant.id, tenant.role], function (err1, result1) {
                                if (err1) {
                                    console.log(err1);
                                }
                            });
                        });
                    }
                    return res.json({
                        status: 200,
                        success: true,
                        message: 'User updated successfully',
                    });
                }
            });
            // return res.send({id: id, message: "THIS IS WORKING HERE"});
        }
        else {
            if (!password) {
                return res.json({
                    status: 200,
                    success: false,
                    message: 'Please enter password',
                });
            }
            if (password.length < 6) {
                return res.json({
                    status: 200,
                    success: false,
                    message: 'Password should be at least 6 characters long',
                });
            }
            let data = {
                firstName,
                lastName,
                emailId,
                tenant,
                is_auto_generate,
                is_force_change,
                password,
            };
            const [check] = yield db_1.pool
                .promise()
                .query('SELECT * FROM user WHERE email_id = ?', [data.emailId]);
            if (check.length > 0) {
                return res.json({
                    status: 200,
                    success: false,
                    message: 'Email already exists. Please enter another email id.',
                });
            }
            const autoGenerate = Math.floor(Math.random() * 10000).toString();
            const salt = yield (0, bcrypt_2.genSaltSync)(12);
            const decryptPassword = yield (0, bcrypt_2.hashSync)(password, salt);
            db_1.pool.query(`INSERT INTO user (first_name, last_name, email_id, tenants, is_auto_generate, is_forced_change_pwd, password) VALUES (?, ?, ?, ?, ?, ?, ?)`, [
                data.firstName,
                data.lastName,
                data.emailId,
                JSON.stringify(data.tenant.map((t) => t.id)),
                data.is_auto_generate,
                data.is_force_change,
                decryptPassword,
            ], function (err, result) {
                if (err) {
                    console.log(err);
                    return res.json({
                        status: 200,
                        success: false,
                        message: 'Failed to insert user data',
                    });
                }
                if (result) {
                    const userId = result === null || result === void 0 ? void 0 : result.insertId;
                    // console.log(userId, 'userId');
                    if (data.tenant && data.tenant.length > 0) {
                        data.tenant.forEach((tenant) => {
                            db_1.pool.query(`INSERT INTO user_tenant_mapping (user_id, tenant_id, role) VALUES (?, ?, ?)`, [userId, tenant.id, tenant.role], function (err1, result1) {
                                if (err1) {
                                    console.log(err1);
                                }
                            });
                        });
                    }
                    return res.json({
                        status: 200,
                        success: true,
                        message: 'Data inserted successfully',
                    });
                }
            });
        }
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.userCreate = userCreate;
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data;
        let userLogin = {};
        let tenant = [];
        let { emailId, password } = req.body;
        if (!emailId) {
            res.json({
                status: 400,
                message: 'Please enter email id',
            });
        }
        if (!password) {
            res.json({
                status: 400,
                message: 'Please enter password',
            });
        }
        const [rows] = yield db_1.pool
            .promise()
            .query('Select * from user where email_id = ?', [emailId]);
        userLogin = Object.assign(Object.assign({}, userLogin), { first_name: rows[0].first_name, last_name: rows[0].last_name, email: rows[0].email_id });
        const lastName = userLogin.last_name;
        const firstName = userLogin.first_name;
        console.log(userLogin, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<userLogin");
        // console.log(password,"<<<password")
        const user = rows[0];
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const comparePassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
            return yield bcrypt_1.default.compare(password, hashedPassword);
        });
        const passwordMatch = yield comparePassword(password, user.password);
        // console.log(passwordMatch,"passwordMatch")
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const firstLeft = db_1.pool.query(`select * from user_tenant_mapping where user_id=?`, [user.id], function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result);
            if (result.length > 0) {
                result.map((item) => {
                    console.log(item, 'ITEM');
                    db_1.pool.query(`select id, name, description from tenant where id=${item.tenant_id}`, function (err1, result1) {
                        if (err1) {
                            console.log(err1);
                        }
                        console.log(result1);
                        result1.map((list) => {
                            console.log(list, 'LIST');
                            if ((item.tenant_id = list.id)) {
                                tenant.push({
                                    id: list.id,
                                    name: list.name,
                                    description: list.description,
                                    role: (item === null || item === void 0 ? void 0 : item.role) ? item === null || item === void 0 ? void 0 : item.role : user === null || user === void 0 ? void 0 : user.role,
                                    license: [],
                                });
                            }
                        });
                        console.log(userLogin, 'UPDATED HERE _ 1');
                        userLogin = Object.assign({}, userLogin);
                    });
                    db_1.pool.query(`select * from license_tenant_mapping where tenant_id=${item.tenant_id}`, function (err1, result1) {
                        if (err1) {
                            console.log(err1);
                        }
                        console.log(result1);
                        if (result1.length > 0) {
                            let license = [];
                            result1.map((elem, i) => {
                                db_1.pool.query(`select * from license where id=${elem.license_id}`, function (err3, result3) {
                                    if (err3) {
                                        console.log(err3);
                                    }
                                    console.log(result3);
                                    tenant.map((resp) => {
                                        if (elem.tenant_id == resp.id &&
                                            elem.license_id == result3[0].id) {
                                            console.log(resp, 'RESP');
                                            resp.license.push({
                                                name: result3[0].license_name,
                                                id: result3[0].id,
                                            });
                                            license.push({
                                                name: result3[0].license_name,
                                                id: result3[0].id,
                                            });
                                        }
                                    });
                                    console.log(license);
                                    tenant.map((resp) => {
                                        if (resp.id == elem.tenant_id) {
                                            console.log(resp, license);
                                        }
                                    });
                                    data = Object.assign(Object.assign({}, userLogin), { tenant: tenant });
                                    console.log(data, 'FINAL', tenant);
                                });
                            });
                        }
                    });
                });
            }
        });
        let payload = {
            id: user.id,
            emailId: emailId,
            firstName: firstName,
            lastName: lastName
        };
        console.log(payload, "<<<<<<payload");
        const token = yield jwt_helper_1.default.generateAccessToken(payload);
        setTimeout(() => {
            res.json({
                status: 200,
                succees: true,
                message: 'login successfully',
                token: token,
                data: data,
            });
        }, 1000);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.userLogin = userLogin;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.sessionUserData.id;
        if (!id) {
            res.json({
                status: 400,
                success: false,
                message: 'please login again',
            });
        }
        const data1 = yield new Promise((resolve, reject) => {
            db_1.pool.query(`Select * from user where id='${id}'`, function (err, result) {
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
    catch (error) {
        return res.json({
            status: 400,
            success: false,
            message: error,
        });
    }
});
exports.getUserById = getUserById;
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT u.*, CONCAT('[', GROUP_CONCAT(JSON_UNQUOTE(JSON_OBJECT('tenant_id', t.id,'tenant_name', t.name,  'role', m.role))), '
  ]') AS tenantMappings
  FROM user u
  JOIN user_tenant_mapping m ON u.id = m.user_id
  JOIN tenant t ON m.tenant_id = t.id
  GROUP BY u.id
      `;
        db_1.pool.query(query, function (err, result) {
            if (err) {
                return res.json({
                    status: 400,
                    success: false,
                    message: err,
                });
            }
            const data = result.map((row) => (Object.assign(Object.assign({}, row), { tenants: row.tenants ? JSON.parse(row.tenants) : '', tenantMappings: row.tenantMappings
                    ? JSON.parse(row.tenantMappings)
                    : '' })));
            res.json({
                status: 200,
                succes: true,
                data: data,
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAll = getAll;
const updateProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.sessionUserData.id;
        if (!id) {
            res.json({
                status: 400,
                success: false,
                message: 'please login again',
            });
        }
        let { firstName, lastName, emailId, tenants, role, password } = req.body;
        if (!firstName) {
            return res.json({
                status: 200,
                success: false,
                message: 'Please enter first name',
            });
        }
        if (!lastName) {
            return res.json({
                status: 200,
                success: false,
                message: 'Please enter last name',
            });
        }
        if (!emailId) {
            return res.json({
                status: 200,
                success: false,
                message: 'Please enter email id',
            });
        }
        if (!tenants) {
            return res.json({
                status: 200,
                success: false,
                message: 'Please select tenants',
            });
        }
        if (!role) {
            return res.json({
                status: 200,
                success: false,
                message: 'Please select tenants',
            });
        }
        if (!password) {
            return res.json({
                status: 200,
                success: false,
                message: 'Please select tenants',
            });
        }
        const data = req.body;
        const update = new Promise((resolve, rejects) => {
            db_1.pool.query(`Update user Set first_name=?,last_name=?,tenants=?,role=?,password=?  WHERE  id=${id}`, [data.firstName, data.lastName, data.tenants, data.role, data.password], function (err, result) {
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
                    message: 'Update profile successfully',
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateProfile = updateProfile;
const deactiveUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.sessionUserData.id;
        if (!id) {
            res.json({
                status: 400,
                success: false,
                message: 'please login again',
            });
        }
        const check = yield new Promise((resolve, reject) => {
            db_1.pool.query(`Update user set status=0 where id='${id}'`, function (err, result) {
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
                    message: 'your account has been deactivated',
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deactiveUser = deactiveUser;
const forgotPasswordSendOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { emailId } = req.body;
        // console.log(req.body);
        if (!emailId) {
            res.json({
                message: 'please enter the emailId',
            });
        }
        // const check = await pool.promise().query(`select * from user where emailId='${emailId}'`)
        // // console.log(check,"check");
        // const generateOpt = Math.floor(Math.random() * 10000).toString();
        // // console.log(generateOpt);
        // sendEmailForgotPassword(emailId,generateOpt);
        // if(!check){
        //      console.log("please enter correct emailId")
        // }
        // const sendemail= await pool.promise().query(`update user set otp=? where emailId='${emailId}'`,[generateOpt])
        // return res.json({
        //      status:200,
        //      success:true,
        //      message:"otp has been sent on your emailId"
        // })
    }
    catch (error) {
        console.log(error);
    }
});
exports.forgotPasswordSendOtp = forgotPasswordSendOtp;
const getDefaultValue = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.sessionUserData.id;
        if (!id) {
            res.json({
                status: 400,
                success: false,
                message: 'please login again',
            });
        }
        const data = yield db_1.pool.query(`select * from widgetmaster where type_default=2`, function (err, result) {
            if (err) {
                res.json({
                    status: 400,
                    success: false,
                    message: err,
                });
            }
            return res.json({
                status: 200,
                success: true,
                message: result,
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getDefaultValue = getDefaultValue;
const insertwidget = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.sessionUserData.id;
        if (!id) {
            return res.json({
                status: 400,
                message: 'please login again',
            });
        }
        const check = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`Select * from widgetmaster where type_default=1`, function (err, result) {
                for (let i = 0; i < result.length; i++) {
                    const insert = db_1.pool
                        .promise()
                        .query(`insert into widgetuser (widget_id,user_id) value(?,?)`, [result[i].id, id], function (err, result) {
                        if (err) {
                            return res.json({
                                status: 400,
                                success: false,
                                message: err,
                            });
                        }
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
exports.insertwidget = insertwidget;
const getAllWidget = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.sessionUserData.id;
        if (!id) {
            return res.json({
                status: 400,
                success: false,
                mesage: 'please login again',
            });
        }
        const getAll = yield new Promise((resolve, reject) => {
            db_1.pool.query(`Select wu.*,ur.first_name,ur.last_name,wm.widget_name,wm.category_type from widgetuser wu LEFT JOIN widgetmaster wm ON wm.id = wu.widget_id LEFT JOIN user ur ON ur.id = wu.user_id`, function (err, result) {
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
    catch (error) {
        console.log(error);
    }
});
exports.getAllWidget = getAllWidget;
const widgetDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id1 = req.params.id;
        const id = req.body.sessionUserData.id;
        if (!id) {
            return res.json({
                status: 400,
                message: 'please login again',
            });
        }
        const remove = yield new Promise((resolve, reject) => {
            db_1.pool.query(`Delete from widgetuser where id=${id1}`, function (err, result) {
                if (err) {
                    console.log(err);
                }
                return res.json({
                    status: 200,
                    message: 'widget delete successfully',
                });
            });
        });
    }
    catch (error) { }
});
exports.widgetDelete = widgetDelete;
const singleWidgetInsert = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { widgetId, userId } = req.body;
        if (!widgetId) {
            return res.json({
                status: 200,
                success: false,
                message: 'Please enter widget id ',
            });
        }
        if (!userId) {
            return res.json({
                status: 200,
                success: false,
                message: 'Please enter user id ',
            });
        }
        const data = req.body;
        const id = req.body.sessionUserData.id;
        if (!id) {
            return res.json({
                status: 400,
                message: 'please login again',
            });
        }
        const data1 = yield new Promise((resolve, rejects) => {
            db_1.pool.query(`Insert into widgetuser (widget_id,user_id)value(?,?)`, [data.widgetId, data.userId], function (err, result) {
                if (err) {
                    console.log(err);
                }
                return res.json({
                    status: 200,
                    message: 'inserted success',
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.singleWidgetInsert = singleWidgetInsert;
// ------------getAll mcd/acs
const widgetmasterGetMcdAcs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.sessionUserData.id;
        const category_type = req.body.category_type;
        if (!id) {
            return res.json({
                status: 400,
                message: 'please login again',
            });
        }
        const getAllMcdOrAcs = yield new Promise((resolve, reject) => {
            db_1.pool.query(`select * from widgetmaster where category_type='${category_type}'`, function (err, result) {
                if (err) {
                    res.json({
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
    catch (error) {
        console.log(error);
    }
});
exports.widgetmasterGetMcdAcs = widgetmasterGetMcdAcs;
