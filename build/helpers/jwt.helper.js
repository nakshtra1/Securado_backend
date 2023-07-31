"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.TOKEN_SECRET || 'localKey';
const jwtExpireTime = '36000s';
function generateAccessToken(data) {
    return jsonwebtoken_1.default.sign(data, jwtSecret, { expiresIn: jwtExpireTime });
}
function verifyAccessToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, jwtSecret);
    }
    catch (error) {
        return error;
    }
}
exports.default = { generateAccessToken, verifyAccessToken };
