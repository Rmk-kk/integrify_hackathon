import { Request, Response } from 'express';
import Column from '../models/Column';

// POST /columns/create

export const createColumn = async (req: Request, res: Response) => {
  try {
    // get data from request body
    const { title, color } = req.body;

    // assign data to column model
    const column = new Column({
      title,
      color,
    });

    // save to database
    const newColumn = await column.save();

    // send success response
    return res.status(200).send({
      success: true,
      message: 'Column createed',
      column: newColumn,
    });
  } catch (error) {
    // handle error
    return res.status(500).send({
      success: false,
      error: 'Server error',
    });
  }
};

// GET /columns

export const getAllColumns = async (req: Request, res: Response) => {
  try {
    // find all columns
    const columns = await Column.find();

    // send success response
    res.status(200).send({ success: true, columns });
  } catch (error) {
    // handle error
    return res.status(500).send({
      success: false,
      error: 'Server error',
    });
  }
};

// GET /columns

export const getColumnById = async (req: Request, res: Response) => {
  try {
    // find column by id
    const column = await Column.findById(req.params.columnId);

    // send success response
    res.status(200).send({ success: true, column });
  } catch (error) {
    // handle error
    return res.status(500).send({
      success: false,
      error: 'Server error',
    });
  }
};

// PUT /column/:columnId

export const updateColumnById = async (req: Request, res: Response) => {
  try {
    // get data from request body
    const update = req.body;

    // find column by id and update
    const updatedColumn = await Column.findByIdAndUpdate(
      req.params.columnId,
      update,
      { new: true }
    );
    if (!updatedColumn)
      return res.status(404).send({
        success: false,
        error: 'Column not found',
      });

    // send success response
    res.status(200).send({
      success: true,
      message: 'Column successfully updated',
      updatedColumn,
    });
  } catch (error) {
    // handle error
    return res.status(500).send({
      success: false,
      error: 'Server error',
    });
  }
};

// DELETE /columns/:columnId

export const deleteColumnById = async (req: Request, res: Response) => {
  try {
    // find column by id and delete
    const deletedColumn = await Column.findByIdAndDelete(req.params.columnId);
    if (!deletedColumn)
      return res.status(404).send({
        success: false,
        error: 'Column not found',
      });

    // send success response
    return res.status(200).send({
      success: true,
      message: 'Column has been deleted',
    });
  } catch (error) {
    // handle error
    return res.status(500).send({
      success: false,
      error: 'Server error',
    });
  }
};
