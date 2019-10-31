import databaseConfig from '../config/database';
import mongoose from 'mongoose';


class Database {
  constructor() {
    this.init();
  }

  init() {
    mongoose.set('useCreateIndex', true)
    mongoose.connect('mongodb://localhost:27017/violentapi', { useNewUrlParser:true, useUnifiedTopology: true });
    mongoose.Promise = global.Promise;
  }
}

const db = new Database();

export {db as default, mongoose }
