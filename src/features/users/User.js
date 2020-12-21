import mongoose from 'mongoose';
import Argon2 from 'argon2';
import Jwt from 'jsonwebtoken';

const { SECRET } = process.env;

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    spendings: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'spendings',
      },
    ],
  },
  { timestamps: true }
);

schema.pre('save', async function (next) {
  const password = this.get('password');
  const hash = await Argon2.hash(password);

  this.set('password', hash);
});

schema.methods.compare = async function (password) {
  return Argon2.verify(this.get('password'), password);
};

schema.methods.genToken = async function () {
  return Jwt.sign({ user: this }, SECRET);
};

export default mongoose.model('User', schema);
