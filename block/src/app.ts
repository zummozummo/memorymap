import express from "express";
import { json } from "body-parser";

import cookieSession from "cookie-session";
import { createBlockRouter } from "../routes/new";
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
app.use(createBlockRouter);
app.all('*',async (req,res,next)=>{
  next(new NotFoundError());
  // await new NotFoundError());
});

app.use(errorHandler);
export {app};
//this is named export 