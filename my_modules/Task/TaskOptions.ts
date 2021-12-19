import TaskData from "./TaskData";
import TaskHandler from "./TaskHandler";

/**
 * @author Barenholz D.
 * @class TaskOptions
 * @description The relevant options for a task
 * @version 0.0.1
 */
type TaskOptions = {
  // The name of the task, required
  id: string;
  // Interval for which to perform the task, required
  interval: number;
  // Identifier of what channel this task runs in, required
  channel: string;
  // Wether or not to run this task on startup of the bot, optional
  runOnStart?: boolean;
  // Whether or not to wait for the bot to be ready, optional
  awaitReady?: boolean;
  // The handler of the task, optional
  handler?: TaskHandler;
  // The category of the task, optional
  category?: string;
  // The description of the task, optional
  description?: string;
  /**
   * Data (placeholders) related to the task
   * Note that every item should be of the form
   *
   * data: {
   *   some_data_item: {
   *     doc: "documentation",
   *     value: 5, // actual value
   *     init: 0 // value to reset to
   *   }
   * }
   */
  data?: any;
};

export default TaskOptions;
