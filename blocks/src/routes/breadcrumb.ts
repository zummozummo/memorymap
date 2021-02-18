import express, { Request, Response } from 'express';
import { requireAuth } from '@memory_map/common'
import { Category } from '../model/category'
const router = express.Router();

router.get('/api/blocks', requireAuth, async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const result = await Category.find({ slug: req.body.slug })
            .select({
                "_id": false,
                "name": true,
                "ancestors.slug": true,
                "ancestors.name": true
            }).exec();
        res.status(201).send({ "status": "success", "result": result });
    } catch (err) {
        res.status(500).send(err);
    }
});

export { router as getBreadcrumbRouter };
