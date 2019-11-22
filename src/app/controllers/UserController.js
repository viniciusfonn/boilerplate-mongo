import User from '../models/User';

class UserController {

  async index(req, res) {
      const {filter, infoFilter} = req.body;

      console.log(filter, infoFilter);
    
    try {

      if (filter == 'name') {
        const user = await User.findOne({ name: infoFilter});
        if (!user) return res.status(400).send({ error: 'No user found' });
      }

      else {
        const user = await User.find();
        if (!user) return res.status(400).send({ error: 'No users found' });
      }
      

      return res.send({
        user,
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
    const { email } = req.body;
    try {
      if (await User.findOne({ email }))
        return res.status(400).send({ error: 'User already exists' });

      const user = await User.create(req.body);

      user.password = undefined;

      return res.send({
        user,
      });
    } catch (error) {
      return res.status(400).send({ error: 'Insert failed' });
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

      await User.findByIdAndDelete(id);

      return res.status(200).send({ msg: 'Success' });
    } catch (error) {
      return res.status(400).send({ error: 'Registration failed' });
    }
  }
}

export default new UserController();
