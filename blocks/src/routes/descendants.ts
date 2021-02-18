import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@memory_map/common'
import { body } from 'express-validator';
import { Category } from '../model/category'
const router = express.Router();

router.get('/api/blocks/descendants', requireAuth, async (req, res) => {
    try {
        const result = await Category.find({ "ancestors._id": req.body.category_id })
            .select({ "_id": false, "name": true })
            .exec();
        res.status(201).send({ "status": "success", "result": result });
    } catch (err) {
        res.status(500).send(err);
    }
})

export { router as descendants };
