import databaseConfig from '../config/database';
import mongoose from 'mongoose';

class Database {
  constructor() {
    this.init();
  }

  init() {
    // this.connection = new Sequelize(databaseConfig);
    mongoose.connect('mongodb://localhost:27017/violentapi', { useNewUrlParser:true, useUnifiedTopology: true });
    mongoose.Promise = global.Promise;
  }
}

export default new Database();
