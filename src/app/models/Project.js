import { UserSchema } from './User';
import { mongoose } from '../../database';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model('User', UserSchema);
const Project = mongoose.model('Project', ProjectSchema);

export { Project as default, ProjectSchema };
