import { request, response } from 'express';
import Spending from './Spending';

class SpendingController {
  async store({ body } = request, res = response, next) {
    try {
      const spending = await Spending.create(body);

      return res.status(201).json(spending);
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  }

  async index({ query } = request, res = response, next) {
    try {
      const spendings = await Spending.find(query);

      return res.status(200).json(spendings);
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  }

  async show({ params } = request, res = response, next) {
    try {
      const spending = await Spending.findOne({ _id: params.id });

      return res.status(200).json(spending);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req = request, res = response, next) {}

  async destroy(req = request, res = response, next) {}
}

export default new SpendingController();
