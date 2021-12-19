import Task from "./Task";

/**
 * @author Barenholz D.
 * @class TaskData
 * @description The relevant data for a task. For now, only the task and its timer is needed.
 * @version 0.3.0
 */
type TaskData = {
  // The task itself, this is a subclass of Task.
  task?: Task;
  // This is set when the task has a timeout
  timerID?: NodeJS.Timeout;
};

export default TaskData;
