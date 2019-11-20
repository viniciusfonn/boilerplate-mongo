import User from '../models/User';
import Task from '../models/Task';

class TaskController {
  async index(req, res) {
    try {
      const tasks = await Task.find().populate('assignedTo');

      if (!tasks) return res.status(400).send({ error: 'No tasks found' });

      return res.send({
        tasks,
      });
    } catch (error) {
      return res.status(400).send({ error: 'Query failed' });
    }
  }

  async show(req, res) {
    const { id } = req.params;

    try {
      const task = await Task.findOne({ _id: id }).populate(['assignedTo']);

      if (!task) return res.status(400).send({ error: 'Task not found' });

      return res.send({
        task,
      });
    } catch (error) {
      return res.status(400).send({ error: 'Query failed' });
    }
  }

  async store(req, res) {
    const {
      title,
      description,
      assignedTo,
      priority,
      status,
      project,
    } = req.body;
    try {
      if (await Task.findOne({ title }))
        return res.status(400).send({ error: 'This task already exists' });

      const userData = await User.findById(assignedTo);
      if (!userData) return res.status(400).send({ error: 'User not found' });

      const task = await Task.create({
        title,
        description,
        priority,
        status,
        assignedTo: userData,
        project,
      });

      // await project.save();
      return res.send({
        task,
      });
    } catch (error) {
      return res.status(400).send({ error: 'Fail to create task' });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    try {
      if (await Task.findOne({ id }))
        return res.status(400).send({ error: 'Project not found' });

      const task = await Task.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.send({
        task,
      });
    } catch (error) {
      return res.status(400).send({ error: 'Update failed' });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      if (await Task.findOne({ id }))
        return res.status(400).send({ error: 'User not found' });

      await Task.findByIdAndDelete(id);

      return res.status(200).send({ msg: 'Success' });
    } catch (error) {
      return res.status(400).send({ error: 'Registration failed' });
    }
  }
}

export default new TaskController();
