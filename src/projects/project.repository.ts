import { Project } from 'src/projects/entities/project.entity';

export interface ProjectRepository {
  create(project: Project): Promise<void>;
  update(project: Project): Promise<void>;
  findAll(): Promise<Project[]>;
  findById(id: string): Promise<Project>;
}
