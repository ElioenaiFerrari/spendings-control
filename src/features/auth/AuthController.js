import { request, response } from 'express';
import User from '@/features/users/User';

class AuthController {
  async signup({ body } = request, res = response, next) {
    try {
      const user = await User.create(body);

      return res.status(201).json(user);
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  }

  async signin({ body } = request, res = response, next) {
    try {
      const user = await User.findOne({ email: body.email });

      if (!user) throw new Error('user not found');

      const isValid = await user.compare(body.password);

      if (!isValid) throw new Error('invalid password');

      const token = await user.genToken();

      return res.status(201).json({ token });
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  }
}

export default new AuthController();
