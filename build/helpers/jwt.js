"use strict";
// import jsonwebtoken, { VerifyErrors } from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express";
// interface User {
//   id: string;
//   emailId: string;
// }
// interface DecodedToken {
//   id: string;
//   emailId: string;
// }
// // Augment the Request type to include the user property
// declare global {
//   namespace Express {
//     interface Request {
//       user?: User;
//     }
//   }
// }
// const jwt = {
//   // Create JWT
//   issueJwt: async (user: User): Promise<string> => {
//     const payload = {
//       id: user.id,
//       emailId: user.emailId,
//     };
//     const options = {
//       expiresIn: '365d',
//     };
//     const jwtToken = await jsonwebtoken.sign(payload, 'KEy', options);
//     return jwtToken;
//   },
//   // Verify JWT
//   verifyTokenfn: async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers.authorization;
//     if (!token) {
//       return res.json({
//         status: false,
//         statusCode: 400,
//         message: "Token Not Found",
//       });
//     }
//     try {
//       const decoded = jsonwebtoken.verify(token, 'KEy') as DecodedToken;
//       req.user = {
//         id: decoded.id,
//         emailId: decoded.emailId,
//       };
//     //   next();
//     } catch (err) {
//       return res.json({
//         status: false,
//         statusCode: 400,
//         message: "Token Not Found",
//       });
//     }
//   },
// };
// export default jwt;
