import { Project } from 'src/projects/entities/project.entity';
import { ProjectRepository } from './project.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SqLiteRepository implements ProjectRepository {
  constructor(
    @InjectRepository(Project)
    private typeOrmRepo: Repository<Project>,
  ) {}

  async create(project: Project): Promise<void> {
    await this.typeOrmRepo.save(project);
  }

  async update(project: Project): Promise<void> {
    await this.typeOrmRepo.update(project.id, project);
  }

  findAll(): Promise<Project[]> {
    return this.typeOrmRepo.find();
  }

  findById(id: string): Promise<Project> {
    return this.typeOrmRepo.findOneOrFail({ where: { id } });
  }
}
