import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    async getAllTasks(): Promise<Task[]> {
        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    async getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id); 
    }

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto ): Promise<Task> {
        return this.tasksService.createTasks(createTaskDto);
    }

    @Delete('/:id')
    async deleteTask(@Param('id') id: string): Promise<void>{
        this.tasksService.deleteTasks(id);
        return console.log('task deleted');
    }


}
