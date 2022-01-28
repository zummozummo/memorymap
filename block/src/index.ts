import mongoose from 'mongoose'
import { app } from './app';
const start = async()=>{

  if(!process.env.JWT_KEY){
    throw new Error('JWT key must be defined');
  }
  if(!process.env.MONGO_URI){
    throw new Error('Mongo uri must be defined');
   } 

  try{
  await mongoose.connect(process.env.MONGO_URI);
  }catch(err){
    console.error(err);
  }

  console.log('connecte to mongodb block');

  app.listen(3000, () => {
    console.log("Listening on port 3000 !");
  });
};

start()


