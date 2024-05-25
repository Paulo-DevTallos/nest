import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateProjectUseCase } from './useCases/create-project.usecase';
import { FindAllProjectsUseCase } from './useCases/findall-projects.usecase';
import { StartProjectUseCase } from './useCases/start-project.usecase';
import { StartProjectDto } from './dto/start-project.dto';

@Controller('projects')
export class ProjectWithUseCaseController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly findAllProjectsUseCase: FindAllProjectsUseCase,
    private readonly startProjectUseCase: StartProjectUseCase,
  ) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.createProjectUseCase.execute(createProjectDto);
  }

  @Get()
  findAll() {
    return this.findAllProjectsUseCase.execute();
  }

  @Post(':id/start')
  start(@Param('id') id: string, @Body() startProjectDto: StartProjectDto) {
    return this.startProjectUseCase.execute(id, startProjectDto);
  }
}
