import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    async getAllTasks(): Promise<Task[]> {
        return this.tasksService.getAllTasks();
        
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id)
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto ): Promise<Task> {
        return this.tasksService.createTasks(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): Promise<void>{
        return this.tasksService.deleteTasks(id);
    }

    @Patch('/:id')
    async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
        return this.tasksService.updateTask(id, updateTaskDto);
    }

}
