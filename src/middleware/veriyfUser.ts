import jwt from 'jwt-simple';

const verifyUser = (req: any, res: any, next: any) => {
   //  if (token) {
   //      jwt.verify(token, key.api_secret_key, (err, decoded) => {
   //          if (err) {
   //              res.json({
   //                  status: false,
   //                  message: 'Failed to authenticate token.',
   //                  err,
   //              });
   //          } else {
   //              req.decode = decoded;
   //              next();
   //          }
   //      });
   //  } else {
   //      res.json({
   //          status: false,
   //          message: 'No token provided',
   //      });
   //  }
   next();
};

export default verifyUser;
