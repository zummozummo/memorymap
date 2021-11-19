import express, { NextFunction } from 'express';
import {body, validationResult} from 'express-validator'
import { Request,Response } from 'express';
import {validateRequest,BadRequestError} from '@mem_map/common'
import { User,UserAttr } from '../models/user';
import { Password } from '../service/password';
import jwt from 'jsonwebtoken'
const router=express.Router();

router.post(
    '/api/users/signin',
    [
      body('email').isEmail().withMessage('Email must be valid'),
      body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password'),
    ],
    validateRequest,
    async (req:Request,res:Response,next:NextFunction)=>{
        const {email, password}=req.body;
        const existingUser= await User.findOne({email});
        if(!existingUser){
            return next(new BadRequestError('Invalid Credentials'));
        }
        const passwordsMatch=await Password.compare(
            existingUser?.password!,
            password
        );
        if(!passwordsMatch){
            return next(new BadRequestError('Invalid Cred'));
        }
        //generate JWT
        const userJWT=jwt.sign({
            id:existingUser?.id,
            email:existingUser?.email
        },process.env.JWT_KEY!);

        //Store it on session object
        //cookie session library is going to take this session searilize it and send it back to users browser
        req.session!.jwt=userJWT;
        res.status(200).send(existingUser);
});

export {router as signinRouter};