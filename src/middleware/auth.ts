import { Request, Response, NextFunction } from 'express';
import jwtHelper from '../helpers/jwt.helper';



const generateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dataBody = req.body;
        //  console.log(dataBody,"databaody");
      const emailId = dataBody.emailId || '';
        const id = dataBody.id || '';
        const payload = {
            emaiil: emailId,
            id:id
        };
        console.log(payload,"payload");
        const token = jwtHelper.generateAccessToken(payload);
        return res.status(200).send({
            success: true,
            token: token
        });
    } catch (error) {
       console.error(error);
       res.status(500).json('Server Error');
    }
};

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.get('Authorization')?.split(' ')[1]; // Bearer YOUR_TOKEN
    
    if (!token) {   
        req.body.isAuth = false;
        next();
    }
    if (token != undefined && token != '') {
        
        const tokenVerify:any  = jwtHelper.verifyAccessToken(token);

        if (!tokenVerify) {
            req.body.isAuth = false;
        } else {    
             req.body.sessionUserData = tokenVerify;
            req.body.isAuth = true;
               }
        next();
    } else {
        return res.send({
            success: false,
            status: 200,
            message: 'Token not found'
        })
    }
};

export default {  generateToken, verifyToken };
