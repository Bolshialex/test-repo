let tasks = [];
let idCounter = 1;

const getTasks = () => tasks;

const addTask = (title) => {
  if (!title) throw new Error("Task title is required");
  const newTask = { id: idCounter++, title, completed: false };
  tasks.push(newTask);
  return newTask;
};

const deleteTask = (id) => {
  const initialLength = tasks.length;
  tasks = tasks.filter((task) => task.id !== parseInt(id));
  return tasks.length < initialLength;
};

const resetTasks = () => {
  tasks = [];
  idCounter = 1;
};

module.exports = { getTasks, addTask, deleteTask, resetTasks };
