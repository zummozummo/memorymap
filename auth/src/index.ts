import mongoose from 'mongoose'
import { app } from './app';
const start = async()=>{

  if(!process.env.JWT_KEY){
    throw new Error('JWT key must be defined');
  }

  try{
  await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
  }catch(err){
    console.error(err);
  }
  //var UserProperties=new User({email: 'bill@initech.com',password: 'Billxxx'});
  //console.log(UserProperties);
  console.log('connecte to mongodb');

  app.listen(3000, () => {
    console.log("Listening on port 3000 !");
  });
};

start()


