import { CreateProjectDto } from '../dto/create-project.dto';
import { Project } from '../entities/project.entity';
import { Inject, Injectable } from '@nestjs/common';
import { ProjectRepository } from '../project.repository';
/** Repository<T> generico precisa de um @ InjectRepository para instanciar o repo pela entidade*/

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepo: ProjectRepository,
  ) {}

  async execute(input: CreateProjectDto) {
    const project = new Project(input);
    await this.projectRepo.create(project);
    return project;
  }
}
