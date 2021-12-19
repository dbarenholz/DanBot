/**
 * @author Barenholz D.
 * @class TaskData
 * @description The relevant data for a task
 * @version 0.2.1
 */
type TaskData = {
  // The task itself
  task?: any;
  // This is set when the task has a timeout
  timerID?: any;
};

export default TaskData;
