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
4. WARNING: `tasks.json` file will be created in the same directory where `task-cli` is used if it does not exist!

## Usage
Run `task-cli help` to print the following usage instruction:
```
usage: task-cli <command> [options]

Commands:
  add <description>                        Add a new task with given description
  update <id> [--description] [--status]   Update a task's description and/or status
  delete <id>                              Delete a task by ID
  list [--todo | --done]                   List all tasks by optional filter: todo or done
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
```

## Next Steps
- Optimize for large JSON files
- Implement short/alias IDs
- Find a better place for tasks.json
