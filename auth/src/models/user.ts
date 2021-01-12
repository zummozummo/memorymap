import mongoose, { Schema } from 'mongoose';
import Iuser from '../interfaces/user';
import { Password } from '../services/password';
const UserSchema: Schema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

//pre is a middlware implemented by mongoose
//mongoose has no support for async await 
//we are responsible for calling done after await.
//this will have the values eg-username and password(docmunet)
//that is why the function(done){} is not arrow function as you will losse value of this
//When we first create a user and assign a password isModified wlll return true
UserSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});



const User = mongoose.model<Iuser>('User', UserSchema);

export { User };