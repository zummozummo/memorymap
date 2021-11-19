import mongoose, { Schema, model } from "mongoose";
import {Password} from '../service/password'
interface UserAttr{
    email:string;
    password: string;
}

const userSchema = new Schema<UserAttr>({
    email: { type: String, required: true },
    password: { type: String, required: true },
  },{
      toJSON:{
          transform(doc,ret){
              ret.id=ret._id;
              delete ret._id;
              delete ret.password;
              delete ret.__v;

          }
      }
  });

//prehook
//use use normal function insted of arrow as value of this is the actual value that is going to be stored
userSchema.pre('save',async function(done){
    if(this.isModified('password')){
        const hashed= await Password.toHash(this.get('password'));
        this.set('password',hashed);
    }
    done();
});  

const User = model<UserAttr>('User',userSchema);
export { User,UserAttr };
