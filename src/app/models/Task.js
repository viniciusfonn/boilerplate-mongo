import { mongoose } from '../../database';
import { ProjectSchema } from './Project';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    require: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  priority: {
    type: String,
  },
  status: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model('Project', ProjectSchema);

const Task = mongoose.model('Task', TaskSchema);

export default Task;
