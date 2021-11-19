import express, { NextFunction, Request, Response } from 'express';
//import 'express-async-errors'
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken'
import {BadRequestError,validateRequest} from '@mem_map/common';
import {User} from '../models/user';


const router=express.Router();

router.post('/api/users/signup',[
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min:4, max:20})
        .withMessage('Password must be b/w 4 and 20 characters')
    ],
    validateRequest,
    async (req:Request,res:Response,next:NextFunction)=>{
        // const errors=validationResult(req);
        
        // if(!errors.isEmpty()){
        //     next(new RequestValidationError(errors.array()));
        // }
        const {email,password}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
             return next(new BadRequestError('Email in use'));
        }
        const user=new User({email,password});
        await user.save();
        
        //generate JWT
        const userJWT=jwt.sign({
            id:user.id,
            email:user.email
        },process.env.JWT_KEY!);

        //Store it on session object
        //cookie session library is going to take this session searilize it and send it back to users browser
        req.session!.jwt=userJWT;

        res.status(201).send(user);
});

export {router as signupRouter};