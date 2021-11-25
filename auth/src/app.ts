import express from "express";
import { json } from "body-parser";

import cookieSession from "cookie-session";
import {currentUserRouter} from './routes/current-user';
import {signinRouter} from './routes/signin';
import {signupRouter} from './routes/signup';
import {signoutRouter} from './routes/singout';
import {forgotPasswordRouter} from './routes/forgot-password';
import {errorHandler,NotFoundError} from '@mem_map/common'

const app = express();
app.set('trust proxy',true); 
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
)

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(forgotPasswordRouter);

app.all('*',async (req,res,next)=>{
  next(new NotFoundError());
  // await new NotFoundError());
});

app.use(errorHandler);
export {app};
//this is named export 