import Project from '../models/Project';
import User from '../models/User';

class ProjectController {
  async index(req, res) {
    try {
      const projects = await Project.find().populate(['user', 'tasks']);

      if (!projects) return res.status(400).send({ error: 'No projects found' });

      return res.send({
        projects,
      });
    } catch (error) {
      return res.status(400).send({ error: 'Query failed' });
    }
  }

  async show(req, res) {
    const { id } = req.params;

    try {
      const user = await User.findOne({ _id: id });

      if (!user) return res.status(400).send({ error: 'User not found' });

      return res.send({
        user,
      });
    } catch (error) {
      return res.status(400).send({ error: 'Query failed' });
    }
  }

  async store(req, res) {
    const { title, description } = req.body;
    try {
      if (await User.findOne({ title }))
        return res.status(400).send({ error: 'This project already exists' });

      const project = await Project.create({title, description, user:req.userId});
    //   await project.save();

    //   user.password = undefined;

      return res.send({
        project,
      });
    } catch (error) {
      return res.status(400).send({ error: 'Fail to create project' });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    try {
      if (await User.findOne({ id }))
        return res.status(400).send({ error: 'User not found' });

      const user = await User.findByIdAndUpdate(id, req.body, { new: true });

      return res.send({
        user,
      });
    } catch (error) {
      return res.status(400).send({ error: 'Registration failed' });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      if (await User.findOne({ id }))
        return res.status(400).send({ error: 'User not found' });

      await User.findOneAndRemove({ id });

      return res.status(200).send({ msg: 'Success' });
    } catch (error) {
      return res.status(400).send({ error: 'Registration failed' });
    }
  }
}

export default new ProjectController();
