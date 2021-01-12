import { Document } from 'mongoose';

export default interface Iuser extends Document {
    email: string;
    password: string;
}