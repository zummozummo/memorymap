import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload{
    id:string;
    email:string;
}

//we are telling ts inside express find the Request interface and add currentUser property
declare global{
    namespace Express{
        interface Request{
            currentUser?:UserPayload
        }
    }
}


export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {  //if we do not have session object and jwt is not defined move to next middleware
    return next();            // if user is not logged in move to next middleware
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!)as UserPayload;
    req.currentUser = payload;                  //agumenting the defination of req object
  } catch (err) {}

  next();
};
