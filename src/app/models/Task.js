import { mongoose } from '../../database';

const TaskSchema = new mongoose.Schema({
    title: {
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
      type: Boolean,
      require: true,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const Task = mongoose.model('Task', TaskSchema);

export default Task;
