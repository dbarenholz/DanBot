interface TaskOptions {
  category: string;
  description: string;
  task(): void;
}

export default TaskOptions;

// public addPrompt(channel: Channel, user: User): void;
