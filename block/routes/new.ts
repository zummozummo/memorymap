import express, {Request,Response} from 'express';
const router=express.Router();

router.post('/api/block',(req:Request,res:Response)=>{
    res.send({"hello":"block created"});
});

router.get('/api/block',(req:Request,res:Response)=>{
    res.send({"hello":"block fetched"});
});

export {router as createBlockRouter}