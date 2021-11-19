import {CustomError} from "./custom-error";
export class DatabaseConnectionError extends CustomError{
    statusCode=500;
    reason='error connection to database'
    constructor(){
        super('database connection error');
    }
    serializeErrors(){
        return [{message:this.reason}]
    }
}