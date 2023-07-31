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
const jwt_helper_1 = __importDefault(require("../helpers/jwt.helper"));
const generateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataBody = req.body;
        //  console.log(dataBody,"databaody");
        const emailId = dataBody.emailId || '';
        const id = dataBody.id || '';
        const payload = {
            emaiil: emailId,
            id: id
        };
        console.log(payload, "payload");
        const token = jwt_helper_1.default.generateAccessToken(payload);
        return res.status(200).send({
            success: true,
            token: token
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json('Server Error');
    }
});
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.get('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Bearer YOUR_TOKEN
    if (!token) {
        req.body.isAuth = false;
        next();
    }
    if (token != undefined && token != '') {
        const tokenVerify = jwt_helper_1.default.verifyAccessToken(token);
        if (!tokenVerify) {
            req.body.isAuth = false;
        }
        else {
            req.body.sessionUserData = tokenVerify;
            req.body.isAuth = true;
        }
        next();
    }
    else {
        return res.send({
            success: false,
            status: 200,
            message: 'Token not found'
        });
    }
});
exports.default = { generateToken, verifyToken };
