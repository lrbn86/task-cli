# Task CLI
Manage tasks through the command line interface

## Features
- Add and delete tasks
- Update a task's status and/or description
- List tasks by optional status filter: todo or done

## Installation
1. Install node at https://nodejs.org/en/download
2. In terminal, run `npm install -g @lrbn/task-cli` to install the `task-cli` package globally
3. `task-cli` can now be used in the terminal

## Usage
Run `task-cli help` to print the following usage instruction:
```
task-cli <command> [options]

Commands:
  add <description>                        Add a new task with given description
  update <id> [--description] [--status]   Update a task's description and/or status
  delete <id>                              Delete a task by ID
  help                                     Show this message

Examples:
  task-cli add "Do laundry"
  task-cli update 1 --status completed
  task-cli update 1 --description "Do chores" --status todo
  task-cli delete 1
```
