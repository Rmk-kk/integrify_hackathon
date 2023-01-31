import express from 'express';
import {
  createColumn,
  getAllColumns,
  getColumnById,
  updateColumnById,
  deleteColumnById,
} from '../controllers/column.controller';

const router = express.Router();

// create column
router.post('/create', createColumn);

// get all columns
router.get('/', getAllColumns);

// get column by id
router.get('/:columnId', getColumnById);

// update column by id
router.put('/:columnId', updateColumnById);

// delete column by id
router.delete('/:columnId', deleteColumnById);

export default router;
