import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';


@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>
    ) {}
    
    async getAllTasks(): Promise<Task[]> {
        return this.tasksRepository.find();
    }

    

    async getTaskById(id: string): Promise<Task> {
        const foundTask = await this.tasksRepository.findOneBy({ id: id });

        if(!foundTask) {
            throw new NotFoundException(`Task with the given ID "${id}" was not found.`);
        }

        return foundTask;
    }
    
    async createTasks(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = this.tasksRepository.create({
            title,
            description,
            status: TaskStatus.OPEN
        });

        await this.tasksRepository.save(task);
        return task;
    }

    async deleteTasks(id: string): Promise<void> {
        await this.tasksRepository.delete(id)
    }


    async updateTask(id: string, UpdateTaskDto: UpdateTaskDto): Promise<Task>{
        const task = await this.getTaskById(id);
        
        if (!task) {
            throw new NotFoundException(`Task with the ID "${id}" was not found.`);
        }

        task.title = UpdateTaskDto.title;
        task.description = UpdateTaskDto.description;

        return this.tasksRepository.save(task);
    }
    


}
