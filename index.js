#!/usr/bin/env node

import fs from 'node:fs';
import crypto from 'node:crypto';

let tasks = [];

if (!fs.existsSync('tasks.json')) {
  await fs.promises.writeFile('tasks.json', '[]');
} else {
  const content = await fs.promises.readFile('tasks.json');
  const json = JSON.parse(content);
  tasks = json;
}

const args = process.argv.splice(2);

if (args.length <= 0) {
  console.error(`[ERROR] command argument required. Run 'task-cli help' to see usage instruction.`);
  process.exit(1);
}

const command = args[0];

if (command === 'add') {
  const description = args[1];
  if (!description) {
    console.error(`[ERROR] a description is required.`);
    process.exit(1);
  }
  const task = {
    id: crypto.randomUUID(),
    description,
    status: 'todo',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  tasks.push(task);
  try {
    await fs.promises.writeFile('tasks.json', JSON.stringify(tasks, null, 2));
    console.log('[SUCCESS] added new task:', task);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
} else if (command === 'update') {
  const statusIndex = args.indexOf('--status');
  const descriptionIndex = args.indexOf('--description');
  let status, description;
  if (statusIndex > -1) status = args[statusIndex + 1];
  if (descriptionIndex > -1) description = args[descriptionIndex + 1];
  const id = args[1];
  const task = tasks.find(t => t.id === id);
  if (!task) {
    console.error('[ERROR] task does not exist.');
    process.exit(1);
  }
  if (!status && !description) {
    console.error(`[ERROR] must provide either --status or --description. Run 'task-cli help' to see usage instruction.`);
    process.exit(1);
  }
  if (status && status !== 'todo' && status !== 'done') {
    console.error('[ERROR] status can either be todo or done.');
    process.exit(1);
  }
  task.status = status || task.status;
  task.description = description || task.description;
  task.updatedAt = new Date();
  try {
    await fs.promises.writeFile('tasks.json', JSON.stringify(tasks, null, 2));
    console.log('[SUCCESS] updated task:', task);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
} else if (command === 'delete') {
  const id = args[1];
  const taskIndex = tasks.findIndex(t => t.id === id);
  const deletedTask = tasks[taskIndex];
  if (taskIndex < 0) {
    console.error('[ERROR] task does not exist.');
    process.exit(1);
  }
  tasks.splice(taskIndex, 1);
  try {
    await fs.promises.writeFile('tasks.json', JSON.stringify(tasks, null, 2));
    console.log('[SUCCESS] deleted task: ', deletedTask);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
} else if (command === 'list') {
  const filter = args[1];
  if (!filter) {
    console.log(tasks);
    process.exit(0);
  }
  if (filter && filter !== '--todo' && filter !== '--done') {
    console.error('[ERROR] filter must be --todo or --done.');
    process.exit(1);
  }
  const filteredTasks = tasks.filter(t => t.status === filter.slice(2));
  console.log(filteredTasks);
} else if (command === 'clear') {
  const confirm = args[1];
  if (confirm !== '--yes') {
    console.warn('[WARN] confirm clear by adding --yes');
    process.exit(1);
  }
  try {
    await fs.promises.writeFile('tasks.json', '[]');
    console.log('[SUCCESS] cleared tasks.json');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
} else if (command === 'help') {
  const msg = `
usage: task-cli <command> [options]

Commands:
  add <description>                        Add a new task with given description
  update <id> [--description] [--status]   Update a task's description and/or status
  delete <id>                              Delete a task by ID
  list [--todo | --done]                   List all tasks by optional filter: todo or done
  clear [--yes]                            Clear tasks.json with confirmation, otherwise do nothing
  help                                     Show this message

Examples:
  task-cli add "Do laundry"
  task-cli update 2b76d754-2ba7-43a1-9ec1-9fbbbf3bd9f3 --status done
  task-cli update 2b76d754-2ba7-43a1-9ec1-9fbbbf3bd9f3 --description "Do chores"
  task-cli update 2b76d754-2ba7-43a1-9ec1-9fbbbf3bd9f3 --description "Do chores" --status todo
  task-cli delete 2b76d754-2ba7-43a1-9ec1-9fbbbf3bd9f3
  task-cli list
  task-cli list --todo
  task-cli list --done
  task-cli clear --yes
  `;
  console.log(msg);
} else {
  console.error(`[ERROR] '${command}' is not a valid command. Run 'task-cli help' to see usage instruction.`);
  process.exit(1);
}
