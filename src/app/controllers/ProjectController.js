import Project from '../models/Project';
import User from '../models/User';

class ProjectController {
  async index(req, res) {
    try {
      const projects = await Project.find().populate(['user']);

      if (!projects)
        return res.status(400).send({ error: 'No projects found' });

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
      const project = await Project.findOne({ _id: id }).populate(['user']);

      if (!project) return res.status(400).send({ error: 'Project not found' });

      return res.send({
        project,
      });
    } catch (error) {
      return res.status(400).send({ error: 'Query failed' });
    }
  }

  async store(req, res) {
    const { title, description, userId } = req.body;
    try {
      if (await Project.findOne({ title }))
        return res.status(400).send({ error: 'This project already exists' });

      const userData = await User.findById(userId);
      if (!userData) return res.status(400).send({ error: 'User not found' });

      const project = await Project.create({
        title,
        description,
        user: userData,
      });

      // await project.save();
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
      if (await Project.findOne({ id }))
        return res.status(400).send({ error: 'Project not found' });

      const project = await Project.findByIdAndUpdate(id, req.body, {
        new: true,
      }).populate(['user']);

      return res.send({
        project,
      });
    } catch (error) {
      return res.status(400).send({ error: 'Update failed' });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      if (await Project.findOne({ id }))
        return res.status(400).send({ error: 'Project not found' });

      await Project.findByIdAndDelete(id);

      return res.status(200).send({ msg: 'Success' });
    } catch (error) {
      return res.status(400).send({ error: 'Registration failed' });
    }
  }
}

export default new ProjectController();
