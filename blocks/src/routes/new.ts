import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@memory_map/common'
import { body } from 'express-validator';
import { Category } from '../model/category'
const router = express.Router();
router.post('/api/blocks', requireAuth, [
    body('name').not().isEmpty().withMessage('Title is required'),
    //body('blockId').not().isEmpty().withMessage('Title is required')
], validateRequest, async (req: Request, res: Response) => {
    let parent = req.body.parent ? req.body.parent : null;
    let category = new Category({ name: req.body.name, parent })

    try {
        let newCategory = await category.save();
        console.log(newCategory);
        buildAncestors(newCategory._id, parent)
        res.status(201).send({ response: `Category ${newCategory._id}` });
    } catch (err) {
        res.status(500).send(err);
    }
});


interface ParentCategory {
    _id: number,
    name: string,
    ancestors: number[],
    slug: string
}


const buildAncestors = async (id: number, parent_id: number) => {
    let ancest = [];
    try {
        let parent_category = await Category.findOne({ "_id": parent_id }, { "name": 1, "slug": 1, "ancestors": 1 }).exec();
        if (parent_category) {
            console.log(parent_category);
            const _id = parent_category.get('_id');
            const name = parent_category.get('name');
            const slug = parent_category.get('slug');
            const ancestors = parent_category.get('ancestors');
            const ancest = ancestors;
            ancest.unshift({ _id, name, slug })
            const category = await Category.findByIdAndUpdate(id, { $set: { "ancestors": ancest } });
        }
    } catch (err) {
        console.log(err.message)
    }
}













export { router as createBlockRouter };
