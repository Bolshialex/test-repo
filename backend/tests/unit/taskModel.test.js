const {
  getTasks,
  addTask,
  deleteTask,
  resetTasks,
} = require("../../src/taskModel");

describe("Task Model Unit Tests", () => {
  beforeEach(() => {
    resetTasks();
  });

  test("should return an empty array initially", () => {
    expect(getTasks()).toEqual([]);
  });

  test("should add a new task successfully", () => {
    const task = addTask("Learn Jest");
    expect(task.id).toBe(1);
    expect(task.title).toBe("Learn Jest");
    expect(task.completed).toBe(false);
    expect(getTasks().length).toBe(1);
  });

  test("should throw an error if title is missing", () => {
    expect(() => addTask("")).toThrow("Task title is required");
  });

  test("should delete a task", () => {
    addTask("Task to delete");
    const success = deleteTask(1);
    expect(success).toBe(true);
    expect(getTasks().length).toBe(0);
  });
});
