import { Request, Response } from 'express';
import Task from '../models/Task';

// POST /tasks/create

export const createTask = async (req: Request, res: Response) => {
  try {
    // get data from request body
    const { title, assigned, description, priority } = req.body;

    // assign data to task model
    const task = new Task({
      title,
      assigned,
      description,
      priority,
    });

    // save to database
    const newTask = await task.save();

    // send success response
    return res.status(200).send({
      success: true,
      message: 'Task createed',
      task: newTask,
    });
  } catch (error) {
    // handle error
    return res.status(500).send({
      success: false,
      error: 'Server error',
    });
  }
};

// GET /tasks

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    // find all tasks
    const tasks = await Task.find();

    // send success response
    res.status(200).send({ success: true, tasks });
  } catch (error) {
    // handle error
    return res.status(500).send({
      success: false,
      error: 'Server error',
    });
  }
};

// GET /tasks

export const getTaskById = async (req: Request, res: Response) => {
  try {
    // find task by id
    const task = await Task.findById(req.params.taskId);

    // send success response
    res.status(200).send({ success: true, task });
  } catch (error) {
    // handle error
    return res.status(500).send({
      success: false,
      error: 'Server error',
    });
  }
};

// PUT /tasks/:taskId

export const updateTaskById = async (req: Request, res: Response) => {
  try {
    // get data from request body
    const update = req.body;

    // find task by id and update
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      update,
      { new: true }
    );
    if (!updatedTask)
      return res.status(404).send({
        success: false,
        error: 'Task not found',
      });

    // send success response
    res.status(200).send({
      success: true,
      message: 'Task successfully updated',
      updatedTask,
    });
  } catch (error) {
    // handle error
    return res.status(500).send({
      success: false,
      error: 'Server error',
    });
  }
};

// DELETE /tasks/:taskId

export const deleteTaskById = async (req: Request, res: Response) => {
  try {
    // find task by id and delete
    const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
    if (!deletedTask)
      return res.status(404).send({
        success: false,
        error: 'Task not found',
      });

    // send success response
    return res.status(200).send({
      success: true,
      message: 'Task has been deleted',
    });
  } catch (error) {
    // handle error
    return res.status(500).send({
      success: false,
      error: 'Server error',
    });
  }
};
