/**
 * @author Barenholz D.
 * @class TaskData
 * @description The relevant data for a task
 * @version 0.2.0
 */
type TaskData = {
  // The task itself
  task?;
  // This is set when the task has a timeout
  timerID?;
};

export default TaskData;
