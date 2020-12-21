import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    parcels: { type: Number, required: true },
    value: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Spending', schema);
