import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectWithUseCaseController } from './project-withusecase.controller';
import { CreateProjectUseCase } from './useCases/create-project.usecase';
import { FindAllProjectsUseCase } from './useCases/findall-projects.usecase';
import { StartProjectUseCase } from './useCases/start-project.usecase';
import { SqLiteRepository } from './sqlite-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [/*ProjectsController,*/ ProjectWithUseCaseController],
  providers: [
    ProjectsService,
    CreateProjectUseCase,
    FindAllProjectsUseCase,
    StartProjectUseCase,
    //SqLiteRepository,
    {
      provide: 'ProjectRepository',
      useClass: SqLiteRepository,
    },
  ],
})
export class ProjectsModule {}

/**
 * Para adicionar a entidade, tanto no modulo raiz quanto em projects é necessário inserir a
 * entidade como modelo do banco. A diferença está em que no modulo raiz registramos tudo que é existente
 * para o projeto. No forFeature utilizamos apenas as entidades que serão utilizadas para tal módulo.
 */
