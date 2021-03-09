import TaskOptions from "./TaskOptions";

class Task {
  // Properties of a task
  id: string;
  options: TaskOptions;

  constructor(id: string, options: TaskOptions) {
    this.id = id;
    this.options = options;
  }

  // Runs the task
  run() {
    this.options.task();
  }

  // Gets information on the task
  information() {
    return this.options.description;
  }
}

export default Task;
