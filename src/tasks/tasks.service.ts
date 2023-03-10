import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    async getAllTasks(): Promise<Task[]> {
        return this.tasks;
    }

    async getTaskById(id:string): Promise<Task> {
        return this.tasks.find((task) => task.id === id );
    }

    async createTasks(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);

        return task;
    }

    async deleteTasks(id: string): Promise<void> {
        this.tasks = this.tasks.filter((task) => task.id !== id);     

    }


}
