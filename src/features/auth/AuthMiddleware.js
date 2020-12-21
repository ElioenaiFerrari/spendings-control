import Jwt from 'jsonwebtoken';
import { request, response } from 'express';

const { SECRET } = process.env;

class AuthMiddleware {
  protect(req = request, res = response, next) {
    try {
      const { authorization } = req.headers;

      if (!authorization) throw new Error('unauthorized');

      const token = authorization.split(' ')[1];

      const user = Jwt.verify(token, SECRET);

      req.user = user;

      next();
    } catch ({ message }) {
      return res.status(401).json({ message });
    }
  }
}

export default new AuthMiddleware();
