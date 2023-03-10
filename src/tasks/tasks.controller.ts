import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    @Post()
    async createTask(
        @Body('title') title: string, 
        @Body('description') description: string
        ): Promise<Task> {
        return this.tasksService.createTasks(title, description);
    }
}
