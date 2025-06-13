import express from 'express';
import { getItems, createItem, deleteItem } from '../controllers/itemsController.js';

const router = express.Router();

router.get('/', getItems);

router.post('/', createItem)

router.delete('/:id', deleteItem);

export default router;
