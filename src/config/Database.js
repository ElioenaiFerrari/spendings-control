import 'dotenv/config';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const { DB_HOST, DB_PORT, DB_NAME } = process.env;

class Database {
  async connect() {
    mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    mongoose.connection.once('open', function () {
      console.log('MONGODB CONNECTED');
    });

    mongoose.connection.on('error', function () {
      console.log('MONGODB DISCONNECTED');
    });
  }
}

export default new Database().connect();
