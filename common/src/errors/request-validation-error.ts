import  {ValidationError} from 'express-validator';
import {CustomError} from "./custom-error";
export class RequestValidationError extends CustomError{
    statusCode=400;
    constructor(public errors:ValidationError[]){
        // 'Error' breaks prototype chain here
        super('Invalid request parameters');
        //prevent from breaking the prototype chain
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }
    serializeErrors(){
       return this.errors.map(err=>{
            return {message:err.msg,fields:err.param}
        });
    }
}