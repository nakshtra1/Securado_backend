import jwt from 'jsonwebtoken';
import { Request } from 'mssql';
const jwtSecret = process.env.TOKEN_SECRET || 'localKey';
const jwtExpireTime = '36000s';

function generateAccessToken(data: any) {
    return jwt.sign(data, jwtSecret, { expiresIn: jwtExpireTime });
}

function verifyAccessToken(token: string) {

    try {
        return jwt.verify(token, jwtSecret);    
    } catch (error) {
        return error;
    }
}


export default { generateAccessToken, verifyAccessToken };